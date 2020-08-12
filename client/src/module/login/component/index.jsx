import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import './index.less';
import { connect } from 'react-redux';
import { actions } from 'module/main';
 
class Main extends React.PureComponent {
  submit = (value) => {
    //
    this.props.dispatch(actions.setCurrentuser(value.username));
  };

  render() {
    return (
      <div className="ro-login-wrap-bg">
        <div className="ro-login-wrap">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.submit}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input size="large" placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password size="large" placeholder="请输入密码" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit"> 登录 </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect()(Main);
