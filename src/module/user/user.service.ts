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

  async getUserList(quest: UserGetUserRequest): Promise<[UserEntity[], number]> {
    const user = await getRepository(UserEntity).findAndCount({
      take: 10
    });
    console.log("user", user)
    return user;
  }

  getRoles(quest: string): boolean {
    return !!quest;
  }

  async createUser(name: string, password: string): Promise<string> {
    const user = await getRepository(UserEntity).findOne({where: {name}, withDeleted: true});
    if (user) {
      throw new HttpException({
        message: '',
        error: '用户已注册',
        code: 1234
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
    console.log("deteleUser", user)
    user.name = name;
    await this.usersRepository.update(id, user);
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
    console.log("deteleUser", user)
    await this.usersRepository.softDelete({name})
    return "ok";
  }

  async getUser(name: string): Promise<UserEntity> {
    const user = await getRepository(UserEntity).findOne({where: {name}});
    if (!user) {
      throw new HttpException({
        message: '',
        error: '用户不存在'
      }, HttpStatus.BAD_REQUEST)
    }
    return user;
  }

  async login(request: UserGetUserRequest): Promise<UserEntity> {
    const user = await getRepository(UserEntity).findOne({where: {...request}});
    if (!user) {
      throw new HttpException({
        message: '',
        error: '用户不存在'
      }, HttpStatus.BAD_REQUEST)
    }
    return user;
  }
}
