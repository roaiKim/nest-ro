import React from 'react';
import { Switch } from 'react-router-dom';
import { Route, async } from 'react-basc';
import { ModuleLoader } from 'service/ModuleLoader';
/* import { MainComponent as Home } from 'module/home';
import { MainComponent as User } from 'module/user-management';
import { MainComponent as System } from 'module/system-management';
import { MainComponent as NoFound } from 'module/404';
import { MainComponent as Upload } from 'module/upload'; */
import MenuComponent from './Menu';
import Circle from './circle';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

const User = async(ModuleLoader.user, 'MainComponent');
const System = async(ModuleLoader.system, 'MainComponent');
const NoFound = async(ModuleLoader.noFound, 'MainComponent');
const Home = async(ModuleLoader.home, 'MainComponent');
const Upload = async(ModuleLoader.upload, 'MainComponent');

class MainLayout extends React.PureComponent {
  render() {
    return (
      <section>
        <section className="ro-menu-wrap">
          <MenuComponent />
        </section>
        <section className="ro-main-wrap">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/user-management" component={User} />
            <Route path="/system-management" component={System} />
            <Route path="/up-load" component={Upload} />
            <Route component={NoFound} />
          </Switch>
        </section>
        <Circle />
      </section>
    );
  }
}

export default MainLayout;
