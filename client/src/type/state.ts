import { State } from 'react-basc';
import { State as HomeState } from 'module/home/type';
import { State as MainState } from 'module/main/type';
import { State as UserState } from 'module/user-management/type';
import { State as systemState } from 'module/system-management/type';

export interface RootState extends State {
  app: {
    main: MainState,
    home: HomeState;
    userManagement: UserState;
    systemManagement: systemState;
  };
}
