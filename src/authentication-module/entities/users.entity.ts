import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Users{
    
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
        required: true,
        minlength: 6,
        type: String
    })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);