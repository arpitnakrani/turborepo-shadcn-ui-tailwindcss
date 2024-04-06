import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { CreateTaskDto } from './createtask.dto';

export class updateTaskDto extends CreateTaskDto{
  @ApiProperty({example: '1',required: true})
  @IsNumber()
  id: number;

}
