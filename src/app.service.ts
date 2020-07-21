import { Injectable } from '@nestjs/common';
import { UserGetUserRequest } from './type';

@Injectable()
export class AppService {
  getHello(quest: UserGetUserRequest): UserGetUserRequest {
    return {...quest};
  }
}
