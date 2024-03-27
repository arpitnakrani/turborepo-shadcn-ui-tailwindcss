import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from "../drizzle/schema"
import { eq } from 'drizzle-orm';
import { PostgresJsDb, DRIZZLE_ORM } from '@ockonor/nest-drizzle';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Injectable()
export class UserService {
  constructor(private readonly drizzleService : DrizzleService){}
  private db  = this.drizzleService.db
  async create(dto: CreateUserDto) {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.email , dto.email)
    });

    if (user) throw new ConflictException('email duplicated');

    const newUsers = await this.db.insert(schema.users).values({
      id : 1 ,
      ...dto,
      password : await hash(dto.password , 10)
    }).returning()

    const { password, ...result } = newUsers[0];
    return result;
  }

  async findByEmail(email: string) {
    console.log(this.db , "dbCOnnection-------------------------------------------")
    return await this.db.query.users.findFirst({
      where: eq(schema.users.email , email)
    });
  }
  async findById(id: number) {
    return await this.db.query.users.findFirst({
      where: eq(schema.users.id , id)
    });
  }
}
