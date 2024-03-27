import { Global, Module } from '@nestjs/common';
import { DrizzleAsyncProvider, drizzleProvider } from './drizzle.provider';
import { DrizzleService } from './drizzle.service';

@Global()
@Module({ 
  providers: [...drizzleProvider ,DrizzleService],
  exports: [DrizzleService]
})
export class DrizzleModule {}
