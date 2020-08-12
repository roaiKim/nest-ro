import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined, DesktopOutlined } from '@ant-design/icons';

export default class MenuComponent extends React.PureComponent {
  render() {
    return (
      <div style={{ width: 256 }}>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/user-management">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/system-management">系统接入</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
