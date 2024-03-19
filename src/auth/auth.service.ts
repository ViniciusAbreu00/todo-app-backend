import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthPayloadDTO } from "./dto/create-auth.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  @Inject(UserService)
  private readonly userService: UserService;

  /**
   * Authenticates a user based on their credentials
   * @param {AuthPayloadDTO} userCredentials - The user's credentials
   * @returns {Promise<{ user: object, token: string }>} - The user object and the JWT token
   */
  async validateUser(userCredentials: AuthPayloadDTO) {
    const findUser = await this.userService.findByEmail(
      userCredentials.username
    );
    if (!findUser) {
      throw new UnauthorizedException("Username or password incorrect");
    }
    const isMatch = await bcrypt.compare(
      userCredentials.password,
      findUser.password
    );
    if (isMatch) {
      const { password, ...rest } = findUser;
      const jwt = this.jwtService.sign(rest);
      const decode = this.jwtService.decode(jwt);
      return { user: decode, token: jwt };
    } else {
      throw new UnauthorizedException("Username or password incorrect");
    }
  }
}
