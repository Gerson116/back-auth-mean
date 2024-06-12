import { Module } from '@nestjs/common';
import { AuthenticationModuleService } from './authentication-module.service';
import { AuthenticationModuleController } from './authentication-module.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthenticationModuleController],
  providers: [
    AuthenticationModuleService, 
    UsersService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{
      name: User.name, schema: UserSchema
    }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '6h' },
    }),
  ],
  exports:[
    AuthenticationModuleService 
  ]
})
export class AuthenticationModuleModule {}
