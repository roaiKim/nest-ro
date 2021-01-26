import React from 'react';
import { Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { connect, DispatchProp } from 'react-redux';
import { actions } from 'module/home';

interface Props extends DispatchProp {
  d: string
}

class Main extends React.PureComponent<Props> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
    // const socket = io.connect(`/?userId=${2}`);
    /* socket.onopen = function () {
      socket.send(
        JSON.stringify({
          event: 'events',
          data: 'test',
        }),
      );
      socket.onmessage = function (data: any) {
        console.log(data);
      };
    }; */
  }

  submit = (value: Store) => {
    // console.log('sss', value);
    this.props.dispatch(actions.skl());
  };

  render() {
    return (
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

          <Form.Item>
            <Button type="primary" htmlType="submit"> 登录 </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect()(Main);
