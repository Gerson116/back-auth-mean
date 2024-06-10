import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModuleModule } from './authentication-module/authentication-module.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.CONNECTION_STRING_DEV),
    AuthenticationModuleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
