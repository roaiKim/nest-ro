import { Controller, Post, UploadedFile, UseInterceptors, UploadedFiles, Put, Get, Query, HttpService } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { RoResponse } from "module/user/type";
import { UploadFile } from "./file.type";
import { zip } from "compressing";
import { rmdir, writeFileSync } from "fs";
import * as path from 'path';
import client from 'ali/ali-oss';

@Controller("file")
export class FileController {
    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    upload(@UploadedFile() file: UploadFile): RoResponse<string> {
        // console.log("file", file, file.buffer)
        const originName = file.originalname;
        const uploadPath = path.join(__dirname, `../../../../localfile`, originName)
        writeFileSync(uploadPath, file.buffer);
        return {code: 0, message: "ok", data: null}
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
