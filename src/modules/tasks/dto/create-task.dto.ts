import { Status } from "../enum/status.enum";

export class CreateTaskDto {
  readonly title: string;
  readonly description?: string;
  readonly status: Status;
  readonly active: boolean;
  readonly categoryId?: number;
}
