import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { JWTAuthGuard } from "src/auth/guards/jwt.guard";
import { TaskStatus } from "./schema/task.schema";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTAuthGuard)
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  @Get(":userID")
  @UseGuards(JWTAuthGuard)
  async findAll(
    @Param("userID") userID: string,
    @Query("status") status: TaskStatus[]
  ) {
    return await this.taskService.findAll(userID, status);
  }

  @Get(":userID/:taskID")
  @UseGuards(JWTAuthGuard)
  async findOne(
    @Param("userID") userID: string,
    @Param("taskID") taskID: string
  ) {
    return await this.taskService.findOne(userID, taskID);
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTAuthGuard)
  update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.taskService.remove(+id);
  }
}
