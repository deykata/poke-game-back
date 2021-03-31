import { Body, Controller, HttpException, Post, ValidationPipe } from '@nestjs/common';
import { ResponseUserDto, UserDataDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) {}

    @Post('check')
    userCheck(
        @Body(new ValidationPipe()) body: UserDataDto
    ) {
        return this.usersService.doUserCheck(body);
    }
}
