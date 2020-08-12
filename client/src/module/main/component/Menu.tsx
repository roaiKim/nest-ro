import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined, DesktopOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { State } from 'react-basc';

interface Props {
  pathname: string;
}

class MenuComponent extends React.PureComponent<Props> {
  calculateMenuKeyByURL = () => {
    const { pathname } = this.props;
    if (pathname === '/') {
      return 'user-management';
    }
    return pathname.slice(1);
  };

  render() {
    return (
      <div style={{ width: 256 }}>
        <Menu
          defaultSelectedKeys={[this.calculateMenuKeyByURL()]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="user-management" icon={<UserOutlined />}>
            <Link to="/user-management">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="system-management" icon={<DesktopOutlined />}>
            <Link to="/system-management">系统接入</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(MenuComponent);
