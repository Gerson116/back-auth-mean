import { Module } from '@nestjs/common';
import { AuthenticationModuleService } from './authentication-module.service';
import { AuthenticationModuleController } from './authentication-module.controller';

@Module({
  controllers: [AuthenticationModuleController],
  providers: [AuthenticationModuleService],
  imports: [
  ]
})
export class AuthenticationModuleModule {}
