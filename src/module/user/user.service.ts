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

  async createUser(name: string, password: string): Promise<UserEntity> {
    const user = await getRepository(UserEntity).findOne({where: {name}});
    if (user) {
      throw new HttpException({
        message: '',
        error: '用户已注册'
      }, HttpStatus.BAD_REQUEST)
    }
    return await this.usersRepository.save({name, password});
  }

  async updateUser(id: string, name: string): Promise<UserEntity> {
    console.log(id, name)
    const user = await getRepository(UserEntity).findOne({where: {id}});
    if (!user) {
      throw new HttpException({
        message: '',
        error: '用户不存在'
      }, HttpStatus.BAD_REQUEST)
    }
    user.name = name;
    return await this.usersRepository.save(user);
  }

  async deteleUser(name: string): Promise<any> {
    const user = await getRepository(UserEntity).findOne({where: {name}});
    if (!user) {
      throw new HttpException({
        message: '',
        error: '用户不存在'
      }, HttpStatus.BAD_REQUEST)
    }
    return await this.usersRepository.delete({name})
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
