import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { hash } from 'bcrypt';


@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const checkEmail = await this.userModel.findOne({email: createUserDto.email}).exec()
    if(checkEmail){
      throw new BadRequestException('Email đã tồn tại')
    }
    const hashPass = await hash(createUserDto.password, 10)
    const user = await this.userModel.create({...createUserDto, email: createUserDto.email, password: hashPass, role: createUserDto.role})
    return user
  }

  async findAll() {
    const users = await this.userModel.find()
    return users
  }

  async findOne(id: string) {
    if(!Types.ObjectId.isValid(id)){
      throw new BadRequestException('ID không hợp lệ')
    }
    const user = await this.userModel.findById({_id:id}).exec()
    if(!user){
      throw new BadRequestException('Người dùng không tồn tại')
    }
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if(!Types.ObjectId.isValid(id)){
      throw new BadRequestException('ID không hợp lệ')
    }
    const user = await this.userModel.findByIdAndUpdate({_id: id}, {...updateUserDto}, {new: true}).exec()
    if(!user){
      throw new BadRequestException('Người dùng không tồn tại')
    }
    return user
  }

  async remove(id: string) {
    if(!Types.ObjectId.isValid(id)){
      throw new BadRequestException('ID không hợp lệ')
    }
    const user = await this.userModel.findByIdAndDelete({_id: id}, {new: true}).exec()
    if(!user){
      throw new BadRequestException('Người dùng không tồn tại')
    }
    return user
  }

  async findEmail(email: string){
    const user = await this.userModel.findOne({email}).exec()
    if(!user){
      throw new BadRequestException('Email không chính xác')
    }
    return user
  }
}
