import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskStatus } from "./schema/task.schema";
import { Model } from "mongoose";
import { UserService } from "src/user/user.service";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
    @Inject(UserService)
    private readonly userService: UserService
  ) {}
  /**
   * Creates a new task.
   * @param createTaskDto - The task data to create.
   * @returns The newly created task.
   */
  async create(createTaskDto: CreateTaskDto) {
    const newTask = new Task({
      ...createTaskDto,
      status: createTaskDto.status ?? TaskStatus.IN_PROGRESS,
    });
    const createdTask = new this.taskModel(newTask);
    const task = await createdTask.save();
    return task;
  }

  /**
   * Returns all tasks for a given user.
   * @param userID - The ID of the user to retrieve tasks for.
   * @returns An array of tasks for the specified user.
   */
  async findAll(userID: string) {
    const tasks = await this.taskModel.find({ userId: userID });
    return tasks;
  }

  /**
   * Returns a single task by its ID.
   * @param userID - The ID of the user who owns the task.
   * @param taskId - The ID of the task to retrieve.
   * @returns The task with the specified ID, or an error if the task does not exist.
   */
  async findOne(userID: string, taskId: string) {
    const task = await this.taskModel.findOne({ _id: taskId }).exec();
    if (!task) {
      throw new NotFoundException(`Task with id:${taskId} not found`);
    }
    const user = this.userService.findOne(userID);
    if (!user) {
      throw new NotFoundException(`User with id:${userID} not found`);
    }
    return task;
  }

  /**
   * Updates an existing task.
   * @param id - The ID of the task to update.
   * @param updateTaskDto - The updated task data.
   * @returns The updated task.
   */
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const user = await this.userService.findOne(updateTaskDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with id:${updateTaskDto.userId} not found`
      );
    }
    const task = await this.taskModel.findOne({ _id: id }).exec();
    if (!task) {
      throw new NotFoundException(`Task with id:${id} not found`);
    }
    await this.taskModel.updateOne({ _id: id }, updateTaskDto);
    const updatedUser = this.taskModel.findById(id);
    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
