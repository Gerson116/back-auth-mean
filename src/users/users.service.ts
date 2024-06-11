import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';
import { ErrorsCode } from './constants/errors.user.code';
import { ErrorsUsersMessage } from './constants/errors.users.message';
import { InternalServerErrorExceptionUserMessage } from './constants/internalServerErrorException.user.message';
import { OperationResult } from './utils/operationResult';
import { MessageUsersResults } from './constants/message.users.results';
import { UsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  
  private _errorMessage: string;
  private _operationResult: OperationResult;
  
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    this._operationResult = new OperationResult();
  }

  private manageErrors(errorCode: number): string{
    switch (errorCode) {
      case ErrorsCode.DuplicateKey:
        this._errorMessage = ErrorsUsersMessage.DuplicateKey;
        break;
      default:
        this._errorMessage = ErrorsUsersMessage.Empty;
        break;
    }
    return this._errorMessage;
  }

  async create(createUserDto: CreateUserDto): Promise<OperationResult> {
    try {

      let { password, ...userData } = createUserDto;
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });

      await newUser.save();
      const { password: passWithHash, ...user } = newUser.toJSON();

      this._operationResult.response = true;
      this._operationResult.message = MessageUsersResults.Create;
      this._operationResult.result = user;
      return this._operationResult;

    } catch (error) {
      this._operationResult.response = false;
      this._operationResult.message = this.manageErrors(error.code);
      this._operationResult.result = null;

      throw new BadRequestException(this._operationResult); 
    }
  }

  async findAll(): Promise<User[]>{
    try {
      let data = await this.userModel.find().exec();
      let tempUser: UsersDto[] = data;
      // this._operationResult.response = true;
      // this._operationResult.message = MessageUsersResults.Create;
      // this._operationResult.result = users;
      // return this._operationResult;
      console.log(tempUser);
      
      return this.userModel.find().exec();
    } catch (error) {
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
