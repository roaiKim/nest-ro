import { FetchListData, SystemManagement } from 'type/api';

export interface State {
  systemManagement: FetchListData<SystemManagement> | null
}
