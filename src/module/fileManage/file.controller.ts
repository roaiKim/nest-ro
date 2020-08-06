import { Controller, Post, UploadedFile, UseInterceptors, UploadedFiles, Put, Get, Query, HttpService } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { RoResponse } from "module/user/type";
import { UploadFile } from "./file.type";

@Controller("file")
export class FileController {
    
    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    upload(@UploadedFile() file: UploadFile): RoResponse<string> {
        console.log("file", file)
        return {code: 0, message: "ok", data: null}
    }

    @Post("uploads")
    @UseInterceptors(FilesInterceptor("file"))
    uploads(@UploadedFiles() file: UploadFile[]): RoResponse<string> {
        console.log("filesss", file)
        return {code: 0, message: "ok", data: null}
    }

    @Get("get")
    uploadsss(@Query() id: string): RoResponse<string> {
        console.log("id-==-", id)
        return {code: 0, message: "ok", data: null}
    }
}
