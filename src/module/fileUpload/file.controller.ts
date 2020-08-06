import { Controller, Post, UploadedFile, UseInterceptors, UploadedFiles, Put, Get, Query, HttpService } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { RoResponse } from "module/user/type";
import { UploadFile } from "./file.type";

@Controller("file")
export class FileController {
    constructor(private readonly httpService: HttpService) {}
    
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
    async uploadsss(@Query("name") name: string): Promise<RoResponse<any>> {
        const user = await this.httpService.get("http://localhost:3000/api/user/get", {params: name}).toPromise().then(reqponse => reqponse.data)
        console.log("iuserd", user)
        return {code: 0, message: "ok", data: user}
    }
}
