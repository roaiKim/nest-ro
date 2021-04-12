import React from 'react';
import { Upload, message, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import mime from 'mime';

class Main extends React.PureComponent {
  submit = (value: Store) => {
    // console.log('sss', value);
  };

  onChange = (info: UploadChangeParam) => {
    console.log(info);
  };

  down = () => {
    console.log("opone")
    axios({    
      method: 'get',    
      url: "http://localhost:3000/api/stream/download",    
      data: {      
        test: "test data"    
      },
      responseType: "arraybuffer"
    }).then((response) => {      
        console.log("1", response.data)
        const extension = mime.getExtension(response.data); 
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          // type: "application/octet-stream"
        })
        console.log("2", blob, extension)
        const url = URL.createObjectURL(blob);
        const ele = document.createElement("a");
        ele.style.display = "none";
        ele.href = url;
        console.log("2", blob)
        ele.download = "xlsx"//  + "." + extension
        document.body.appendChild(ele); // 这样做是为了兼容firefox
        ele.click()
        document.body.removeChild(ele);
    })
  }

  render() {
    return (
      <div className="">
        <Upload name="file" action="/api/file/uploadoss" onChange={this.onChange}>
          <Button icon={<UploadOutlined />}>单文件上传图片</Button>
        </Upload>
        <div>
          <button onClick={this.down}>文件stream下载</button>
        </div>
      </div>
    );
  }
}

export default Main;
