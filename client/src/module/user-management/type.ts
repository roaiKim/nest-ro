import { FetchListData, UserManagement } from 'type/api';

export interface State {
  userManagement: FetchListData<UserManagement> | null
}
