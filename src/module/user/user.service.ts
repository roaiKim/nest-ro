import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserGetUserRequest } from './type';
import { Repository, Connection, getRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private connection: Connection
  ){}

  getHello(quest: UserGetUserRequest): UserGetUserRequest {
    return {...quest};
  }

  getRoles(quest: string): boolean {
    return !!quest;
  }

  async createUser(name: string, password: string): Promise<string> {
    const user = await getRepository(UserEntity).findOne({where: {name}});
    if (user) {
      throw new HttpException({
        message: '',
        error: '用户已注册'
      }, HttpStatus.BAD_REQUEST)
    }
    await this.usersRepository.save({name, password});
    return "ok";
  }

  async updateUser(id: string, name: string): Promise<string> {
    const user = await getRepository(UserEntity).findOne({where: {id}});
    if (!user) {
      throw new HttpException({
        message: '',
        error: '用户不存在'
      }, HttpStatus.BAD_REQUEST)
    }
    user.name = name;
    await this.usersRepository.save(user);
    return "ok";
  }

  async deteleUser(name: string): Promise<string> {
    const user = await getRepository(UserEntity).findOne({where: {name}});
    if (!user) {
      throw new HttpException({
        message: '',
        error: '用户不存在'
      }, HttpStatus.BAD_REQUEST)
    }
    await this.usersRepository.softDelete(user)
    return "ok";
  }

  async getUserByName(name: string): Promise<UserEntity> {
    const user = await getRepository(UserEntity).findOne({where: {name}});
    if (!user) {
      throw new HttpException({
        message: '',
        error: '用户不存在'
      }, HttpStatus.BAD_REQUEST)
    }
    return user;
  }
}
