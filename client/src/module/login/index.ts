import { Module, register } from 'react-basc';
import Main from './component';
import { State } from './type';

class MainModule extends Module<{}> {}

const module = register(new MainModule('login', {}));

export const actions = module.getActions();
export const MainComponent = module.attachLifecycle(Main);
