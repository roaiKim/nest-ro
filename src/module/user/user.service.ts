import { Injectable } from '@nestjs/common';
import { UserGetUserRequest } from './type';

@Injectable()
export class UserService {
  getHello(quest: UserGetUserRequest): UserGetUserRequest {
    return {...quest};
  }

  getRoles(quest: string): boolean {
    return !!quest;
  }
}
