import { IsEmail, IsString } from "class-validator";

export class UsersDto{
    
    _id: string;

    name: string;
    
    lastName: string;
    
    birthDate: Date;

    email: string;
    
    isActive: boolean;
    
    roles: string[];
}