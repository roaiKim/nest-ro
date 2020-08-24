import { Lifecycle, Loading, Module, register } from 'react-basc';
import { MainService } from 'service/api/MainService';
import Main from './component';
import { State } from './type';

const initialState: State = {
  user: null,
};

class MainModule extends Module<State> {
  @Lifecycle()
  onRegister() {
    this.fetchCurrentuser();
  }

  @Loading('mask')
  async fetchCurrentuser() {
    const response = await MainService.fetchCurrentUser();
    this.setState({ user: response.data.name });
  }

  @Loading('mask')
  async setCurrentuser(request: any) {
    const response = await MainService.login(request);
    this.setState({ user: response.data.name });
  }
}

const module = register(new MainModule('main', initialState));
export const actions = module.getActions();
export const MainComponent = module.attachLifecycle(Main);
