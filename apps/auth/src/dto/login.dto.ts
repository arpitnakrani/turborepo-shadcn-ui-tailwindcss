import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @ApiProperty({example : "arpit@yopmail.com"})
  email: string;

  @IsString()
  @ApiProperty({example : "Admin|Moderator|User"})
  password: string;
}
