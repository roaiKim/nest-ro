import { Module, register } from 'react-basc';
import Main from './component';
import { RouteParam, State } from './type';

const initialState: State = {
  type: undefined,
};

class MainModule extends Module<State, RouteParam> {}

const module = register(new MainModule('home', initialState));
export const actions = module.getActions();
export const MainComponent = module.attachLifecycle(Main);
