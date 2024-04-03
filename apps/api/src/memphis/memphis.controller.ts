import { Controller, Post } from '@nestjs/common';
import { MemphisService } from './memphis.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('memphis')
@Controller('memphis')
export class MemphisController {
    constructor(private readonly MemphisService : MemphisService){}

    @Post('produce')
    async produceData(){
        return this.MemphisService.Produce();
    } 

    @Post('consume')
    async consumeData(){
        return this.MemphisService.Consume();
    } 
}
