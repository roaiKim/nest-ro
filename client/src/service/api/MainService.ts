import { ajax } from 'react-basc';
import { CurrentUserAPIResponse, HomeAPIResponse, UserLoginRequest } from 'type/api';

export class MainService {
  static login(request: UserLoginRequest): Promise<HomeAPIResponse<CurrentUserAPIResponse>> {
    return ajax('POST', '/api/user/login', request);
  }

  static fetchLoginUser(): Promise<HomeAPIResponse<CurrentUserAPIResponse>> {
    return ajax('GET', '/api/user/check', {});
  }

  /* static changeMoneyPassword(request: ChangePasswordAPIRequest): Promise<void> {
        return ajax("POST", "/account/money-password", {}, request);
  } */
}
