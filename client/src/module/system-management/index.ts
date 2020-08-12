import { Module, register, Lifecycle, Loading } from 'react-basc';
import { SystemService } from 'service/api/SystemService';
import { message } from 'antd';
import Main from './component';
import { WithConfirm } from 'util/decorator';
import { State } from './type';

const initialState: State = {
  systemManagement: null,
};

class MainModule extends Module<State> {
  @Lifecycle()
  @Loading()
  async onRender() {
    this.fetchUserManagement();
  }

  @Loading()
  async fetchUserManagement() {
    const response = await SystemService.fetchUserManagement();
    this.setState({ systemManagement: response.data });
  }

  @Loading()
  @WithConfirm('确定下架该系统?')
  async userFreeze(id: string) {
    const response = await SystemService.userFreeze(id);
    if (response.code === 0) {
      this.fetchUserManagement();
      message.success('操作成功');
    }
  }

  @Loading()
  async userResetPassword(id: string) {
    const response = await SystemService.userFreeze(id);
    if (response.code === 0) {
      this.fetchUserManagement();
      message.success('操作成功');
    }
  }
}

const module = register(new MainModule('systemManagement', initialState));
export const actions = module.getActions();
export const MainComponent = module.attachLifecycle(Main);
