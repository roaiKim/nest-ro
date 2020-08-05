import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
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
}
