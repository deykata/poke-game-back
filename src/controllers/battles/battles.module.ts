import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleTypesEntity } from 'src/shared/models/battle-types.entity';
import { BattlesEntity } from 'src/shared/models/battles.entity';
import { UsersEntity } from 'src/shared/models/users.entity';
import { BattlesController } from './battles.controller';
import { BattlesService } from './battles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      BattleTypesEntity,
      BattlesEntity
    ])
  ],
  providers: [BattlesService],
  controllers: [BattlesController]
})
export class BattlesModule {}
