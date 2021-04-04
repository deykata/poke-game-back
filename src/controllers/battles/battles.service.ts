import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BattleTypesEntity } from 'src/shared/models/battle-types.entity';
import { BattlesEntity } from 'src/shared/models/battles.entity';
import { UsersEntity } from 'src/shared/models/users.entity';
import { Repository } from 'typeorm';
import { BattleDataDto, ResponseBattleDto, ResponseTypesDto, singleResponseType } from './battles.dto';

@Injectable()
export class BattlesService {
    private readonly logger = new Logger(BattlesService.name, true);

    constructor(
        @InjectRepository(UsersEntity) private readonly userRepo: Repository<UsersEntity>,
        @InjectRepository(BattleTypesEntity) private readonly battleTypeRepo: Repository<BattleTypesEntity>,
        @InjectRepository(BattlesEntity) private readonly battlesRepo: Repository<BattlesEntity>
    ) {}

    async getBattleTypes() {
        try {
            const response = {} as ResponseTypesDto;
            response.types = [];
            const foundTypes = await this.battleTypeRepo.find();
            foundTypes.forEach(type => {
                const item = new singleResponseType(type.id, type.name, type.active, type.ptsXBattle, type.type);
                response.types.push(item);
            })
            return response;
        } catch (error) {
            return new HttpException('Error on getting battle types', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async saveNewBattle(body: BattleDataDto) {
        try {
            
            let battleUser = await this.userRepo.findOne({
                where: { user: body.user }
            })
            if (!battleUser) {
                return new HttpException('User not found', HttpStatus.NOT_FOUND);    
            }
            let battleType = await this.battleTypeRepo.findOne({
                where: { id: body.type }
            })
            if (!battleType) {
                return new HttpException('Incorrect battle type', HttpStatus.NOT_ACCEPTABLE);    
            }
            const response = await this.saveBattle(body, battleUser, battleType);
            return response;
        } catch (err) {
            return new HttpException('Error on saving battle', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async saveBattle(battle: BattleDataDto, user: UsersEntity, battleType: BattleTypesEntity) {
        try {
            // update user points
            const battlePoints = battle.damage + battleType.ptsXBattle;
            user.allPoints = user.allPoints + battlePoints;
            await this.userRepo.update(user.id, user);

            // save battle
            const newBattle = {} as BattlesEntity;
            newBattle.typeId = battleType;
            newBattle.points = battlePoints;
            newBattle.userId = user;
            await this.battlesRepo.save(newBattle);

            // return result
            const result: ResponseBattleDto = {
                messageText: 'Battle saved succesfully'
            };
            return result;
        } catch (error) {
            return new HttpException('Error in battle saving transaction', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
