import { ajax } from 'react-basc'
import { CurrentUserAPIResponse, HomeAPIResponse, UserLoginRequest } from 'type/api'

export class MainService {
  static fetchCurrentUser (request: UserLoginRequest): Promise<HomeAPIResponse<CurrentUserAPIResponse>> {
    return ajax("GET", "/ajax/user/getuser", request);
  }

  /* static changeMoneyPassword(request: ChangePasswordAPIRequest): Promise<void> {
        return ajax("POST", "/account/money-password", {}, request);
    } */
}
