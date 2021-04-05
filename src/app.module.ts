import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { BattlesModule } from './controllers/battles/battles.module';
import { RankingsModule } from './controllers/rankings/rankings.module';
import { UsersModule } from './controllers/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true
    }),
    BattlesModule,
    RankingsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
