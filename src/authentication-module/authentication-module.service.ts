import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Login } from './dto/login';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { OperationResult } from './utils/operationResult';
import { LoginMessage } from './constants/login.message';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersDto } from 'src/users/dto/users.dto';

@Injectable()
export class AuthenticationModuleService {
  private _errorMessage: string;
  private _operationResult: OperationResult;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(login: Login): Promise<OperationResult> {
    this._operationResult = new OperationResult();
    try {
      let resp = await this.usersService.findByEmail(login.email);

      const { password, ...tempData } = resp;

      if (resp == null || resp == undefined) {
        throw new UnauthorizedException(LoginMessage.Error);
      }

      if (bcryptjs.compareSync(login.password, password) == false) {
        throw new UnauthorizedException(LoginMessage.Error);
      }

      const userDTO: UsersDto = tempData;

      this._operationResult!.response = true;
      this._operationResult!.message = LoginMessage.Success;
      this._operationResult!.result = tempData;
      this._operationResult!.token = await this.generateJWT(userDTO);

      return this._operationResult;
    } catch (error) {
      this._operationResult.response = false;
      this._operationResult.message = error.message;
      this._operationResult.result = null;
      this._operationResult.token = null;
      throw new BadRequestException(this._operationResult);
    }
  }

  private async generateJWT(user: UsersDto): Promise<string> {
    
    const payload = {
      fullName: `${user.name} ${user.lastName}`,
      isActive: user.isActive,
      email: user.email,
      roles: user.roles
    };

    return await this.jwtService.signAsync(payload);
  }
}
