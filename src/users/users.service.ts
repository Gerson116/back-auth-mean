import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';
import { ErrorsCode } from './constants/errors.user.code';
import { ErrorsUsersMessage } from './constants/errors.users.message';
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

  private manageErrors(errorCode: number): string {
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
        ...userData,
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
      this._operationResult.result = error.message;

      throw new BadRequestException(this._operationResult);
    }
  }

  async findAll(): Promise<OperationResult> {
    try {
      let data = await this.userModel.find().exec();
      let tempUser: UsersDto[] = data.map((user) => {
        const { password, ...result } = user.toObject();
        return result;
      });
      this._operationResult.response = true;
      this._operationResult.message = MessageUsersResults.Success;
      this._operationResult.result = tempUser;
      return this._operationResult;
    } catch (error) {
      this._operationResult.response = false;
      this._operationResult.message = MessageUsersResults.Error;
      this._operationResult.result = error.message;
      throw new BadRequestException(this._operationResult);
    }
  }

  private async findUser(id: string): Promise<UsersDto> {
    try {
      let data = await this.userModel.findById(id).exec();
      let { password, ...result } = data.toObject();

      let tempUser: UsersDto = result;
      console.log(tempUser);

      return result;
    } catch (error) {}
  }

  async findByEmail(email: string): Promise<User>{
    try {
      const data = await this.userModel.findOne({email});
      return data.toObject();
    } catch (error) {
    }
    return null;
  }

  async findOne(id: string): Promise<OperationResult> {
    try {
      let data = await this.userModel.findById(id).exec();

      if (data == null || data == undefined) {
        this._operationResult.response = true;
        this._operationResult.message = MessageUsersResults.UserNotFound;
        this._operationResult.result = null;
        throw new BadRequestException(this._operationResult);
      }

      let { password, ...result } = data.toObject();

      this._operationResult.response = true;
      this._operationResult.message = MessageUsersResults.Success;
      this._operationResult.result = result;

      return this._operationResult;
    } catch (error) {
      this._operationResult.response = false;
      this._operationResult.message = MessageUsersResults.Error;
      this._operationResult.result = error.message;
      throw new BadRequestException(this._operationResult);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let { password, ...user } = updateUserDto;

      updateUserDto.password = bcryptjs.hashSync(password, 10);
      let result = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();

      this._operationResult.response = true;
      this._operationResult.message = MessageUsersResults.Update;
      this._operationResult.result = result;
      return this._operationResult;
    } catch (error) {
      this._operationResult.response = false;
      this._operationResult.message = this.manageErrors(error.code);
      this._operationResult.result = error.message;

      throw new BadRequestException(this._operationResult);
    }
  }

  async remove(id: string) {
    try {
      const deleteUser = await this.userModel.findByIdAndDelete(id).exec();
      if (!deleteUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      this._operationResult.response = true;
      this._operationResult.message = MessageUsersResults.Update;
      this._operationResult.result = deleteUser;
      return this._operationResult;
    } catch (error) {
      this._operationResult.response = false;
      this._operationResult.message = this.manageErrors(error.code);
      this._operationResult.result = error.message;

      throw new BadRequestException(this._operationResult);
    }
  }
}
