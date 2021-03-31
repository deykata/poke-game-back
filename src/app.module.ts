import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
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
  providers: [AppService],
})
export class AppModule {}
