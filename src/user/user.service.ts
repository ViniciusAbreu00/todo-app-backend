import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { EntityManager, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager
  ) {}
  /**
   * Creates a new user in the database
   * @param {CreateUserDto} createUserDto - The user data to create
   */
  async create(createUserDto: CreateUserDto) {
    const doesUserExist = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (doesUserExist) {
      throw new ConflictException("User already exists");
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds
    );

    const user = new User({ ...createUserDto, password: hashedPassword });
    const createdUser = await this.entityManager.save(user);
    const { password, ...rest } = createdUser;
    return rest;
  }
  /**
   * Returns a list of all users in the database
   * @returns {User[]} An array of user objects
   */
  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  /**
   * Returns a single user based on the user ID
   * @param {string} id - The ID of the user to retrieve
   * @returns {User} The user with the matching ID, or null if no user was found
   */
  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }
  /**
   * Searches for a user by email.
   *
   * @param email - The email of the user to search for.
   * @returns The user with the matching email, or null if no user was found.
   */
  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  /**
   * Updates an existing user in the database
   * @param {string} id - The ID of the user to update
   * @param {UpdateUserDto} updateUserDto - The updated user data
   * @returns {Promise<User>} The updated user
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds
      );
      user.email = updateUserDto.email;
      user.password = hashedPassword;
      return await this.entityManager.save(user);
    } else {
      throw new UnprocessableEntityException(`Could not find user ${id}`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
