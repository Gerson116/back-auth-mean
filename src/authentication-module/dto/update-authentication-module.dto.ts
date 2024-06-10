import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthenticationModuleDto } from './create-authentication-module.dto';

export class UpdateAuthenticationModuleDto extends PartialType(CreateAuthenticationModuleDto) {}
