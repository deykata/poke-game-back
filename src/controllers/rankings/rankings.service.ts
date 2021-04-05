import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BattlesEntity } from 'src/shared/models/battles.entity';
import { UsersEntity } from 'src/shared/models/users.entity';
import { Repository } from 'typeorm';
import { ResponseRankingItem, ResponseRankingDto} from './rankings.dto';

@Injectable()
export class RankingsService {
    private logger: Logger = new Logger(RankingsService.name, true);
    
    constructor(
        @InjectRepository(BattlesEntity) private readonly battlesRepo: Repository<BattlesEntity>,
        @InjectRepository(UsersEntity) private readonly userRepo: Repository<UsersEntity>,
    ) {}

    async getRanking(type: string, limit: any, userId: string) {
        this.logger.log(`Fetching rankings`);
        try {
            this.logger.log(`Ranking type: ${type}; Ranking limit: ${limit}`);
            let ranking;
            const limitParam = Number.isInteger(parseInt(limit)) ? limit : null;
            if (type == 'combined') {
                ranking = await this.userRepo.find({
                    order: { allPoints: "DESC" },
                    take: limitParam
                });
            } else {
                ranking = await this.battlesRepo.find({
                    where: this.getCondition(type, userId),
                    order: { points: "DESC" },
                    take: limitParam,
                    relations: ["userId"]
                })
            }
            this.logger.log(`Fetched rankings succesfully`);
            return this.mapRankingResult(type, ranking);;
        } catch (error) {
            return new HttpException('Error on getting player rankings', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getCondition(type: string, userId: any) {
        let condition = {};
        if (type == 'player') {
            condition = { userId: userId };
        }

        return condition;
    }

    mapRankingResult(type, ranking) {
        const rankingArray = {} as ResponseRankingDto;
        rankingArray.rankings = [];
        ranking.forEach((item, i) => {
            let newItem;
            if (type === 'combined') {
                newItem = new ResponseRankingItem(i+1, item.user, item.allPoints);
            } else {
                newItem = new ResponseRankingItem(i+1, item.userId.user, item.points);
            }
            rankingArray.rankings.push(newItem);
        })
        return rankingArray;
    }
}
