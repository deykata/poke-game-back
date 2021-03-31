import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/shared/models/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        UsersEntity
    ])
],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
