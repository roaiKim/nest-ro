import { Module, register } from 'react-basc';
import Main from './component';
import { State } from './type';

const initialState: State = {
  user: null,
};

class MainModule extends Module<{}> { }

const module = register(new MainModule('login', initialState));

export const actions = module.getActions();
export const MainComponent = module.attachLifecycle(Main);
