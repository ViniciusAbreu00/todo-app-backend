import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { TaskStatus } from "../schema/task.schema";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
  @IsString()
  @IsOptional()
  dueDate: Date;
  @IsString()
  @IsNotEmpty()
  userId: string;
}
