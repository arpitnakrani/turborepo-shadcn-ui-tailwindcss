import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { FastifyRequest } from 'fastify';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserSupabaseService } from './user-supabase.service';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { CreateUserDto } from './dto/user-supabase.dto';

@ApiTags('user-supabase-auth')
@Controller('user-supabase')
export class UserSupabaseController {
    constructor(
        private UserSupabaseService: UserSupabaseService
        ) {}

      @Post('register')
      @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
      @ApiResponse({ status: 403, description: 'Forbidden.'})
      @ApiBody({
         type: CreateUserDto,
         description: 'Json structure for user object',
      })
      async registerUser(@Body() dto: CreateUserDto) {
        return await this.UserSupabaseService.create(dto);
      }
    
      @Post('login')
      @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
      @ApiResponse({ status: 403, description: 'Forbidden.'})
      @ApiBody({
         type: LoginDto,
         description: 'Json structure for user object',
      })
      async login(@Body() dto: LoginDto) {
        return await this.UserSupabaseService.login(dto);
      }
    
    
    //   @ApiBearerAuth('authorization')
    //   @UseGuards(RefreshJwtGuard)
    //   @Post('refresh')
    //   async refreshToken(@Request() req:FastifyRequest) {
    //     console.log('refreshed');
    
    //     return await this.authService.refreshToken(req.user);
    //   }

    @Get('getAllUsers')
    async getAllUsers() {
      return await this.UserSupabaseService.getAllUsers();
    }
}
