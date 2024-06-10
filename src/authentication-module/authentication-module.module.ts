import { Module } from '@nestjs/common';
import { AuthenticationModuleService } from './authentication-module.service';
import { AuthenticationModuleController } from './authentication-module.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { ConfigModule } from '@nestjs/config';
import { UserSchema, Users } from './entities/users.entity';

@Module({
  controllers: [AuthenticationModuleController],
  providers: [AuthenticationModuleService],
  imports: [
    MongooseModule.forFeature([{
      name: Users.name, schema: UserSchema
    }]),
  ]
})
export class AuthenticationModuleModule {}
