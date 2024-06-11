import { Prop } from "@nestjs/mongoose";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    
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
