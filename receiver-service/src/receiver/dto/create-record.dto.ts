import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  class: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  age: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}