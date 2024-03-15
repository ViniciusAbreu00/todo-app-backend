import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe())
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const response = await this.usersService.update(id, updateUserDto);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
