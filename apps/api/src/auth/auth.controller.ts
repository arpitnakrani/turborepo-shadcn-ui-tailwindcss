import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { FastifyRequest } from 'fastify';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
     type: CreateUserDto,
     description: 'Json structure for user object',
  })
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Post('login')
  // @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.'})
  // @ApiBody({
  //    type: LoginDto,
  //    description: 'Json structure for user object',
  // })
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }


  @ApiBearerAuth('authorization')
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req:FastifyRequest) {
    console.log('refreshed');

    return await this.authService.refreshToken(req.user);
  }
}
