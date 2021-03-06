import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import './index.less';
import { Store } from 'rc-field-form/lib/interface.d';
import { connect, DispatchProp } from 'react-redux';
import { actions } from 'module/main';

export interface LoginAJAXRequest {
  username: string;
  password: string;
}

class Main extends React.PureComponent<DispatchProp> {
  submit = (value: Store) => {
    this.props.dispatch(actions.setCurrentUser(value as Store));
  };

  render() {
    return (
      <div className="ro-login-wrap-bg">
        <video className="ro-login-vider-bg" autoPlay muted loop>
          <source src="https://public-upsky.oss-cn-shenzhen.aliyuncs.com/bg.mp4" type="video/mp4" />
          <track default kind="captions" srcLang="en" />
        </video>
        <div className="ro-login-wrap">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.submit}
          >
            <Form.Item
              name="name"
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
