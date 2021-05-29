import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from "fs"
import { join } from "path";

@Injectable()
export class StreamService {
  async download(): Promise<any> {
    try {
        const data = await (fs.readFile(join(__dirname, "../../../../localfile", "test.xlsx"), (err, data) => {
            // console.log(data)
            if (!data) {
                // throw new Error("文件不存在")
                throw new HttpException({
                    message: '用户名或密码不正确!',
                    error: '',
                    code: 2323
                }, HttpStatus.BAD_REQUEST)
            }     
            return data
        }))
      return data;
    } catch (exception) {
      throw new HttpException({
        message: `${((exception.sqlMessage || "").match(/(?<='|").*?(?='|")/) || [])[0]} 已存在`,
        error: exception.toString(),
        code: 15530
      }, HttpStatus.BAD_REQUEST)
    }
  }
}
