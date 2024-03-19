import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export enum TaskStatus {
  CANCELED = "CANCELED",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
export type TaskDocument = HydratedDocument<Task>;

@Schema({ collection: "tasks", timestamps: true })
export class Task {
  @Prop()
  name: string;

  @Prop()
  status: TaskStatus;

  @Prop()
  description: string;

  @Prop()
  dueDate: Date;

  @Prop()
  userId: string;
  constructor(task: Partial<Task>) {
    Object.assign(this, task);
  }
}

export const TaskSchema = SchemaFactory.createForClass(Task);
