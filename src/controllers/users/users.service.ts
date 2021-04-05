import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/shared/models/users.entity';
import { Repository } from 'typeorm';
import { ResponseUserDto } from './users.dto';

@Injectable()
export class UsersService {
    private logger: Logger = new Logger(UsersService.name, true);

    constructor(
        @InjectRepository(UsersEntity) private readonly userRepo: Repository<UsersEntity>,
    ) {}

    async doUserCheck(payload) {
        this.logger.log(`Starting user check`);
        try {
            let foundUser = await this.userRepo.findOne({
                where: { user: payload.user }
            })
            if (!foundUser) {
                const newUser = this.userRepo.create();
                newUser.user = payload.user;
                await this.userRepo.save(newUser);
                this.logger.log(`New user created: ${newUser.id}`);
                return this.mapNewUser(newUser);
            }
            this.logger.log(`Found user: ${foundUser.id}`);
            return this.mapNewUser(foundUser);
        } catch (error) {
            return new HttpException('Error on checking user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    mapNewUser(newUser) {
        const user = {} as ResponseUserDto;
        user.name = newUser.user;
        user.userId = newUser.id;
        user.points = newUser.allPoints;
        return user;
    }
}
