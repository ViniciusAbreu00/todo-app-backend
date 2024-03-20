import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../schema/task.schema";

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
  @IsString()
  @IsNotEmpty()
  userId: string;
}
