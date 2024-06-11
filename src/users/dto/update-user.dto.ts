import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    _id: string;

    @IsString()
    name: string;
    
    @IsString()
    lastName: string;
    
    @IsString()
    birthDate: Date;

    @IsEmail()
    email: string;
    
    @MinLength(6)
    password: string;
}
