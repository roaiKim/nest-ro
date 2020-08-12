import React from 'react';
import { Form, Input, Button, Table } from 'antd';
import './index.less';
import { Store } from 'rc-field-form/lib/interface.d';
import { ColumnsType } from 'antd/lib/table';
import { FetchListData, SystemManagement } from 'type/api';
import { connect, DispatchProp } from 'react-redux';
import { RootState } from 'type/state';
import { actions } from 'module/user-management';
import { Encrypt, Decrypt } from 'util/secret';
import { DocTitle } from 'util/decorator';
import AddSystemModal from './AddSystemModal';

export interface LoginAJAXRequest {
  username: string;
  password: string;
}

interface Props extends DispatchProp {
  userList: FetchListData<SystemManagement> | null
}

interface State {
  show: boolean;
  systemItem: SystemManagement | null
}

class Main extends React.PureComponent<Props, State> {
  columns: ColumnsType<SystemManagement> = [
    {
      title: '系统名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '系统地址',
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: 'Access Token',
      dataIndex: 'accessToken',
      align: 'center',
    },
    {
      title: '用户组',
      dataIndex: 'array',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: '操作',
      key: 'operate',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => this.userEdit(record)}>编辑</Button>
          <Button type="link" onClick={() => this.userFreeze(record)}>下架</Button>
        </div>
      ),
      align: 'center',
    },
  ];

  constructor(props: Props) {
    super(props);
    this.state = {
      show: false,
      systemItem: null,
    };
  }

  @DocTitle('系统接入')
  componentDidMount() {}

  // 冻结
  userFreeze = (record: SystemManagement) => {
    this.props.dispatch(actions.userFreeze(record.id));
  };

  // 编辑
  userEdit = (record: SystemManagement) => {
    this.setState({ show: true, systemItem: record });
  };

  closeModal = () => {
    this.setState({ show: false, systemItem: null });
  };

  submit = (value: Store) => {
    console.log('---value------<>', value);
    const encryptValue = Encrypt(value.address);
    console.log('---encryptValue------<>', encryptValue);
    const decryptValue = Decrypt(encryptValue);
    console.log('---decryptValue------<>', decryptValue);
  };

  render() {
    const { userList } = this.props;
    const { show, systemItem } = this.state;

    return (
      <div className="ro-system-mangagement">
        <div className="ro-system-mangagement-filter">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.submit}
            layout="inline"
          >
            <Form.Item
              name="address"
              rules={[{ required: true, message: '请输入系统地址' }]}
            >
              <Input size="large" placeholder="系统地址" />
            </Form.Item>
            <Form.Item
              name="token"
              rules={[{ required: true, message: '请输入 Access Token' }]}
            >
              <Input size="large" placeholder="Access Token" />
            </Form.Item>
            <div className="ro-button-wrap">
              <Button type="primary" htmlType="submit">查询</Button>
              <Button type="primary" onClick={() => this.setState({ show: true })}>新增系统</Button>
            </div>
          </Form>
        </div>
        <div className="ro-system-mangagement-body">
          <Table rowKey="id" columns={this.columns} dataSource={userList?.list} />
        </div>
        {show && <AddSystemModal initItem={systemItem} closeModal={this.closeModal} />}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  userList: state.app.systemManagement.systemManagement,
});

export default connect(mapStateToProps)(Main);
