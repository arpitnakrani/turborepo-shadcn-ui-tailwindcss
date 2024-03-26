import { FastifyRequest } from 'fastify';
import { CreateUserDto } from 'src/user/dto/user.dto';

declare module 'fastify' {
  interface FastifyRequest {
    user?: CreateUserDto; // Define the user property
  }
}