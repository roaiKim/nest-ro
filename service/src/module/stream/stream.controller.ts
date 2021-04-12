import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from 'express'
import * as fs from "fs"
import { join } from "path";
import { StreamService } from "./stream.service";

@Controller("stream")
export class StreamController {
    constructor(private readonly streamService: StreamService) {}

    @Get('download')
    async login(@Res() response: Response): Promise<any> {
        // response.header("Content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") 
        // response.header("Content-type", "application/x-msdownload") 
        /* fs.readFile(join(__dirname, "../../../../localfile", "test.xlsx"), (err, data) => {
            // console.log(data)
            if (!data) {
                // throw new Error("文件不存在")
                throw new HttpException({
                    message: '用户名或密码不正确!',
                    error: '',
                    code: 2323
                }, HttpStatus.BAD_REQUEST)
            }     
            return response.send(data)
        })
        // return response.send(data) */
        const data = fs.createReadStream(join(__dirname, "../../../../localfile", "test.xlsx"))
        
        data.pipe(response)
        return response
    }
}
