import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  // @ApiProperty({example: '1',required: true})
  // @IsNumber()
  // id: number;

  @ApiProperty({example: 'SampleTask',required: true})
  @IsString()
  task: string;

  @ApiProperty({ example: "1" ,required: true})
  @IsNumber()
  author: number;


}
