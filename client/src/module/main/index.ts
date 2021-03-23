import { Lifecycle, Loading, Module, register } from 'react-basc';
import { MainService } from 'service/api/MainService';
import { Location } from 'history';
import { createErrorMessage } from 'util/ui/message';
import Main from './component';
import { State } from './type';

const initialState: State = {
  user: "ro",
  pathname: null,
};

class MainModule extends Module<State> {
  @Lifecycle()
  onRegister() {
    this.fetchCurrentUser();
  }

  @Lifecycle()
  onRender(routeParameters: {}, location: Location) {
    this.setState({ pathname: location.pathname || '' });
  }

  @Loading('mask')
  async fetchCurrentUser() {
    const response = await MainService.fetchLoginUser();
    /* if (response.code === 0) {
      this.setState({ user: response.data.name });
      if (this.state.pathname === '/login') {
        this.setHistory('/');
      }
    } else {
      this.setHistory('/login');
    } */
  }

  @Loading()
  async setCurrentUser(request: any) {
    const response = await MainService.login(request);
    /* if (response.code === 0) {
      this.setState({ user: response.data.name });
      this.setHistory('/');
    } else {
      createErrorMessage(response.message || '登录失败');
    } */
  }
}

const module = register(new MainModule('main', initialState));
export const actions = module.getActions();
export const MainComponent = module.attachLifecycle(Main);
