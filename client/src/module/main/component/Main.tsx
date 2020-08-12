import React from 'react';
import { Switch } from 'react-router-dom';
import { Route, async } from 'react-basc';
import { ModuleLoader } from 'service/ModuleLoader';
import MenuComponent from './Menu';

const User = async(ModuleLoader.user, 'MainComponent');
const System = async(ModuleLoader.system, 'MainComponent');
const NoFound = async(ModuleLoader.noFound, 'MainComponent');

class MainLayout extends React.PureComponent {
  render() {
    return (
      <section>
        <section className="ro-menu-wrap">
          <MenuComponent />
        </section>
        <section className="ro-main-wrap">
          <Switch>
            <Route path="/(user-management)?" component={User} />
            <Route path="/system-management" component={System} />
            <Route component={NoFound} />
          </Switch>
        </section>
      </section>
    );
  }
}

export default MainLayout;
