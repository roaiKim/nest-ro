import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import './index.less';
import { Store } from 'rc-field-form/lib/interface.d';
import { actions } from 'module/user-management';
import { Encrypt, Decrypt } from 'util/secret';
import { SystemManagement } from 'type/api';

export interface LoginAJAXRequest {
  username: string;
  password: string;
}

interface Props {
  closeModal: () => void,
  initItem: SystemManagement | null
}

class AddSystemModal extends React.PureComponent<Props, {}> {
  isEdit: boolean;

  constructor(props: Props) {
    super(props);
    this.isEdit = !!this.props.initItem;
  }

  submit = (value: Store) => {
    console.log('---value------<>', value);
    const encryptValue = Encrypt(value.username);
    console.log('---encryptValue------<>', encryptValue);
    const decryptValue = Decrypt(encryptValue);
    console.log('---decryptValue------<>', decryptValue);
  };

  render() {
    const { initItem } = this.props;

    return (
      <Modal
        title="新增用户"
        wrapClassName="ro-g-modal-wrap ro-add-user"
        width="60%"
        maskClosable={false}
        visible
        footer={null}
      >
        <Form
          name="add-user"
          initialValues={{ remember: true }}
          onFinish={this.submit}
          layout="inline"
        >
          <Form.Item name="username" initialValue={this.isEdit ? initItem!.name : ''} rules={[{ required: true, message: '请输入系统名称' }]}>
            <Input size="large" placeholder="系统名称" />
          </Form.Item>

          <Form.Item name="username2" initialValue={this.isEdit ? initItem!.address : ''} rules={[{ required: true, message: '请输入系统地址' }]}>
            <Input size="large" placeholder="系统地址" />
          </Form.Item>

          <Form.Item name="username3" initialValue={this.isEdit ? initItem!.array : ''}>
            <Input size="large" placeholder="用户组 不填默认全部用户" />
          </Form.Item>

          <div className="ro-g-modal-button-wrap">
            <Button onClick={() => this.props.closeModal()}>取消</Button>
            <Button type="primary" htmlType="submit">确定</Button>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default AddSystemModal;
