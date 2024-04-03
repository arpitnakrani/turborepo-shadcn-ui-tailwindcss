import { Module } from '@nestjs/common';
import { MemphisController } from './memphis.controller';
import { MemphisService } from './memphis.service';

@Module({
  controllers: [MemphisController],
  providers:[MemphisService]
})
export class MemphisModule {}
