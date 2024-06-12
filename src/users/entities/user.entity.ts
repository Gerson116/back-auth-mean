import { PartialType } from "@nestjs/mapped-types";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UsersDto } from "../dto/users.dto";

@Schema()
export class User extends PartialType(UsersDto){

    _id: string;
    
    @Prop({
        required: true,
        type: String
    })
    name: string;

    @Prop({
        required: true,
        type: String
    })
    lastName: string;

    @Prop({
        required: true,
        type: Date
    })
    birthDate: Date;

    @Prop({
        required: true,
        unique: true,
        type: String
    })
    email: string;

    @Prop({
        minlength: 6
    })
    password: string;

    @Prop({
        default: true
    })
    isActive: boolean;

    @Prop({
        type: [String],
        default: ['user']
    })
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);