import { Controller, Post, UploadedFile, UseInterceptors, UploadedFiles, Put, Get, Query, HttpService } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { RoResponse } from "module/user/type";
import { UploadFile } from "./file.type";
import { zip } from "compressing";
import { rmdir, writeFile, accessSync, mkdirSync } from "fs";
import * as path from 'path';
import client from 'ali/ali-oss';
import { Base64 } from 'js-base64';
import { FileService } from "./file.service";
import configPath from "config/server";

@Controller("file")
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    async upload(@UploadedFile() file: UploadFile): Promise<any> {
        // console.log("file", file, file.buffer)
        const originName = file.originalname.split(".");
        const uploadPath = configPath.picturePath;
        // 名字转成 base64 + 时间戳的形式
        const base64Namme = `${Base64.encodeURL(originName.slice(0, -1).join("") + new Date().getTime())}.${originName[originName.length - 1]}`
        const filePath = path.join(uploadPath, base64Namme)
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        try {
            // 检查文件夹是否存在
            accessSync(uploadPath)
        } catch {
            // 不存在 则 则新建
            mkdirSync(uploadPath, { recursive: true })
        }
        writeFile(filePath, file.buffer, (error) => {
            console.log("error", error)
        });
        const absolutePath = `${configPath.host}/${configPath.prefix}/${base64Namme}`;
        this.fileService.uploadSingImg({relativePath: base64Namme, absolutePath, name: file.originalname});
        return {code: 0, message: "ok", data: {
            relativePath: base64Namme,
            absolutePath
        }}
    }

    @Post("uploads")
    @UseInterceptors(FilesInterceptor("file"))
    uploads(@UploadedFiles() file: UploadFile[]): RoResponse<string> {
        console.log("filesss", file)
        return {code: 0, message: "ok", data: null}
    }

    @Post("uploadzip")
    @UseInterceptors(FileInterceptor("file"))
    uploadUnzip(@UploadedFile() file: UploadFile): RoResponse<string> {
        console.log("filesssll", file)
        const origin = file.originalname.split('.');
        const name = `${origin.slice(0, -1).join("")}`;
        const uploadPath = path.join(__dirname, `../../../../uploads/${new Date().toISOString().substring(0, 10)}`, encodeURIComponent(name))
        zip.uncompress(file.buffer, uploadPath).then(() => {
            console.error("success!");
            rmdir(path.join(uploadPath, "__MACOSX"), (err) => {
                console.error("rmdir, success!", err);
            })
        }).catch(err => {
            console.error(err);
        });
        return {code: 0, message: "ok", data: null}
    }

    @Post("uploadoss")
    @UseInterceptors(FileInterceptor("file"))
    uploadToAliOss(@UploadedFile() file: UploadFile): RoResponse<string> {
        // console.log("filesssll", file)
        client.put(file.originalname, file.buffer, {"headers": {'Content-Type': 'image/jpg'}}).then((result) => {
            // console.error("upload-result", result);
        }).catch()
        return {code: 0, message: "ok", data: null}
    }
}
