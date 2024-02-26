import { IsBoolean, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, MinLength } from "class-validator";
import { Status } from "../enum/status.enum";

export class CreateTaskDto {

  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsEnum(Status)
  readonly status: Status;

  @IsBoolean()
  readonly active: boolean;

  @IsNumberString()
  readonly categoryId?: number;
}
