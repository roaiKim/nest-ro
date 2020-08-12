import { ajax } from 'react-basc'
import {HomeAPIResponse , FetchListData, SystemManagement} from 'type/api'

export class SystemService {
  static fetchUserManagement (): Promise<HomeAPIResponse<FetchListData<SystemManagement>>> {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 1000 + 900
      setTimeout(resolve, delay, {
        code: 0,
        message: 'ok',
        data: {
          list: [
            {
              id: '1',
              name: '雅典娜',
              address: 'roos ',
              accessToken: 'New York No. 1 Lake Park',
              array: '用户组3',
              status: true
            },
            {
              id: '2',
              name: '雅典娜2',
              address: 'roos 2',
              accessToken: 'New York No. 1 Lake Park 222',
              array: '用户组3',
              status: true
            },
            {
              id: '3',
              name: '雅典娜3',
              address: 'roos 3',
              accessToken: 'New York No. 1 Lake Park 333',
              array: '用户组3',
              status: true
            },
          ]
        },
      })
    })
  }

  static userFreeze (id: string): Promise<HomeAPIResponse<{}>> {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 1000 + 900
      setTimeout(resolve, delay, {
        code: 0,
        message: 'ok',
        data: {
          id
        }
      })
    })
  }

  /* static changeMoneyPassword(request: ChangePasswordAPIRequest): Promise<void> {
        return ajax("POST", "/account/money-password", {}, request);
    } */
}
