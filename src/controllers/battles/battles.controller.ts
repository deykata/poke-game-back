import { Body, Controller, Get, HttpException, Post, ValidationPipe } from '@nestjs/common';
import { BattleDataDto, ResponseBattleDto, ResponseTypesDto } from './battles.dto';
import { BattlesService } from './battles.service';

@Controller('battles')
export class BattlesController {

    constructor(
        private battlesService: BattlesService
    ) {}

    @Get('types')
    battleTypes(): Promise<ResponseTypesDto | HttpException> {
        return this.battlesService.getBattleTypes();
    }

    
    @Post('new-battle')
    newBattle(
        @Body(new ValidationPipe()) body: BattleDataDto
    ): Promise<ResponseBattleDto | HttpException> {
        return this.battlesService.saveNewBattle(body);
    }
}
