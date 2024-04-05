import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    example: 'Admin|Moderator|User',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({ example: "arpit@yopmail.com"})
  @IsEmail()
  email: string;

  @ApiProperty({ example: "Admin|Moderator|User"})
  @IsString()
  password: string;

  @ApiProperty({ example: "Admin|User|PortalUser|AnonUser"})
  @IsString()
  role: string;
}
