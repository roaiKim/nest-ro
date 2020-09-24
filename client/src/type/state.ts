import { State } from 'react-basc';
import { State as HomeState } from 'module/home/type';
import { State as MainState } from 'module/main/type';
import { State as UserState } from 'module/user-management/type';
import { State as SystemState } from 'module/system-management/type';
import { State as UploadState } from 'module/upload/type';

export interface RootState extends State {
  app: {
    main: MainState,
    home: HomeState;
    userManagement: UserState;
    systemManagement: SystemState;
    upload: UploadState;
  };
}
