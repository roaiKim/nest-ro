import { Controller, Post, UploadedFile, UseInterceptors, UploadedFiles, Put, Get, Query, HttpService } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { RoResponse } from "module/user/type";
import { UploadFile } from "./file.type";
import { zip } from "compressing";
import { rmdir } from "fs";
import * as path from 'path';

@Controller("file")
export class FileController {
    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    upload(@UploadedFile() file: UploadFile): RoResponse<string> {
        console.log("file", file, file.buffer)
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
        zip.uncompress(file.buffer, path.join(__dirname, name)).then(() => {
            console.error("success!");
            rmdir(path.join(__dirname, name, "__MACOSX"), (err) => {
                console.error("rmdir, success!", err);
            })
        }).catch(err => {
            console.error(err);
        });
        return {code: 0, message: "ok", data: null}
    }
}
