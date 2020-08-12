import React from 'react';
import { showLoading, async, Route } from 'react-basc';
import { connect } from 'react-redux';
import { RootState } from 'type/state';
import { Switch } from 'react-router-dom';
import { ModuleLoader } from 'service/ModuleLoader';
import { ConfigProvider } from 'antd';
import LoadingComponent from './LoadingComponent';
import MainLayout from './Main';
import './index.less';

interface Props {
  showGlobalLoading: boolean;
  showMaskLoading: boolean;
  currentUser: string | null;
}

// const login = async(ModuleLoader.login, 'MainComponent');
const login = async(ModuleLoader.login, 'MainComponent');

class Component extends React.PureComponent<Props> {
  render() {
    const { showGlobalLoading, currentUser, showMaskLoading } = this.props;

    return (
      <ConfigProvider input={{ autoComplete: 'off' }}>
        <main>
          {(showGlobalLoading || showMaskLoading) && <LoadingComponent type={showMaskLoading} />}
          <Switch>
            <Route path="/login" component={login} />
            <Route component={currentUser ? MainLayout : login} />
          </Switch>
        </main>
      </ConfigProvider>
    );
  }
}

const mapStateToProps = (state: RootState): Props => ({
  showGlobalLoading: showLoading(state),
  showMaskLoading: showLoading(state, 'mask'),
  currentUser: state.app.main.user,
});

export default connect(mapStateToProps)(Component);
