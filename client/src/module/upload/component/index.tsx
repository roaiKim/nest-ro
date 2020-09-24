import React from 'react';
import { Upload, message, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadOutlined } from '@ant-design/icons';

class Main extends React.PureComponent {
  submit = (value: Store) => {
    // console.log('sss', value);
  };

  onChange = (info: UploadChangeParam) => {
    console.log(info);
  };

  render() {
    return (
      <div className="">
        <Upload name="file" action="/api/file/uploadoss" onChange={this.onChange}>
          <Button icon={<UploadOutlined />}>单文件上传图片</Button>
        </Upload>
      </div>
    );
  }
}

export default Main;
