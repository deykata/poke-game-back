import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { ResponseRankingDto } from './rankings.dto';
import { RankingsService } from './rankings.service';

@Controller('rankings')
export class RankingsController {

    constructor(
        private rankingsService: RankingsService
    ) {}

    @Get('battle')
    battleRankings(
        @Query('limit') limit
    ): Promise<ResponseRankingDto | HttpException> {
        return this.rankingsService.getRanking('battle', limit, null);
    }

    @Get('player')
    playerRankings(
        @Query('limit') limit,
        @Query('userId') userId
    ): Promise<ResponseRankingDto | HttpException> {
        return this.rankingsService.getRanking('player', limit, userId);
    }

    @Get('combined')
    combinedRankings(
        @Query('limit') limit
    ): Promise<ResponseRankingDto | HttpException> {
        return this.rankingsService.getRanking('combined', limit, null);
    }
}
