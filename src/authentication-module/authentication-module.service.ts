import { Injectable } from '@nestjs/common';
import { CreateAuthenticationModuleDto } from './dto/create-authentication-module.dto';
import { UpdateAuthenticationModuleDto } from './dto/update-authentication-module.dto';

@Injectable()
export class AuthenticationModuleService {
  create(createAuthenticationModuleDto: CreateAuthenticationModuleDto) {
    return 'This action adds a new authenticationModule';
  }

  findAll() {
    return `This action returns all authenticationModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authenticationModule`;
  }

  update(id: number, updateAuthenticationModuleDto: UpdateAuthenticationModuleDto) {
    return `This action updates a #${id} authenticationModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} authenticationModule`;
  }
}
