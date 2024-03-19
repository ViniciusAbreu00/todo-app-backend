import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TaskStatus } from "../schema/task.schema";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string;
  @IsEnum(TaskStatus)
  status: TaskStatus;
  @IsString()
  dueDate: Date;
  @IsString()
  @IsNotEmpty()
  userId: string;
}
