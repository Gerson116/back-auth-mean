import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationModuleService } from './authentication-module.service';
import { CreateAuthenticationModuleDto } from './dto/create-authentication-module.dto';
import { UpdateAuthenticationModuleDto } from './dto/update-authentication-module.dto';

@Controller('authentication-module')
export class AuthenticationModuleController {
  constructor(private readonly authenticationModuleService: AuthenticationModuleService) {}

  @Post()
  create(@Body() createAuthenticationModuleDto: CreateAuthenticationModuleDto) {
    return this.authenticationModuleService.create(createAuthenticationModuleDto);
  }

  @Get()
  findAll() {
    return this.authenticationModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authenticationModuleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthenticationModuleDto: UpdateAuthenticationModuleDto) {
    return this.authenticationModuleService.update(+id, updateAuthenticationModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authenticationModuleService.remove(+id);
  }
}
