import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationModuleService } from './authentication-module.service';
import { Login } from './dto/login';

@Controller('authentication-module')
export class AuthenticationModuleController {
  constructor(private readonly authenticationModuleService: AuthenticationModuleService) {}

  @Post()
  login(@Body() login: Login) {
    return this.authenticationModuleService.login(login);
  }
}
