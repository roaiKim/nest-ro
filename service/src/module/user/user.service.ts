import { Injectable, HttpException, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { UserGetUserRequest } from './type';
import { Repository, Connection, getRepository, Like } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'module/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private connection: Connection,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
  ){}

  async getUserList(quest: UserGetUserRequest): Promise<[UserEntity[], number]> {
    const user = await this.usersRepository.findAndCount({
      take: 2,
      skip: 2
    });
    // console.log("user", user)
    return user;
  }

  getRoles(quest: string): boolean {
    return !!quest;
  }

  async createUser(name: string, password: string): Promise<string> {
    const user = await this.usersRepository.findOne({where: {name}, withDeleted: true});
    if (user) {
      throw new HttpException({
        message: '',
        error: '用户已注册',
        code: 15530
      }, HttpStatus.BAD_REQUEST)
    }
    await this.usersRepository.save({name, password});
    return "ok";
  }

  async updateUser(id: string, name: string): Promise<string> {
    const user = await this.usersRepository.findOne({where: {id}});
    if (!user) {
      throw new HttpException({
        message: '',
        error: '用户不存在',
        code: 15530
      }, HttpStatus.BAD_REQUEST)
    }
    // console.log("deteleUser", user)
    user.name = name;
    await this.usersRepository.update(id, user);
    return "ok";
  }

  async deteleUser(name: string): Promise<string> {
    const user = await this.usersRepository.findOne({where: {name}});
    if (!user) {
      throw new HttpException({
        message: '',
        error: '用户不存在',
        code: 15530
      }, HttpStatus.BAD_REQUEST)
    }
    // console.log("deteleUser", user)
    await this.usersRepository.softDelete({name})
    return "ok";
  }

  async getUser(name: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({name: Like(`%${name}%`)});
    // const user = await this.usersRepository.find({where: [{name: Like(`%luo%`)}, {id: Like(`%4329%`)}]});
    if (!user) {
      throw new HttpException({
        message: '',
        error: '用户不存在',
        code: 15530
      }, HttpStatus.BAD_REQUEST)
    }
    return user;
  }

  async getUserIncludePassword(name: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({where: {name}});
    if (!user) {
      throw new HttpException({
        message: '',
        error: '用户不存在',
        code: 15530
      }, HttpStatus.BAD_REQUEST)
    }
    return user;
  }

  async getUserByCookie(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({where: {id}});
    if (!user) {
      throw new HttpException({
        message: '',
        error: '用户不存在',
        code: 15530
      }, HttpStatus.BAD_REQUEST)
    }
    return user;
  }

  async login(name: string, password: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({where: {name, password}});
    if (!user) {
      throw new HttpException({
        message: '',
        error: '用户名或密码不正确!',
        code: 2323
      }, HttpStatus.BAD_REQUEST)
    }
    return user;
  }
}
