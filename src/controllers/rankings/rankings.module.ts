import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattlesEntity } from 'src/shared/models/battles.entity';
import { UsersEntity } from 'src/shared/models/users.entity';
import { RankingsController } from './rankings.controller';
import { RankingsService } from './rankings.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BattlesEntity,
            UsersEntity
        ])
    ],
    providers: [RankingsService],
    controllers: [RankingsController]
})
export class RankingsModule {}
