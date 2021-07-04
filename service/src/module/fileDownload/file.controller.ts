import { Controller, Post, UploadedFile, UseInterceptors, UploadedFiles, Put, Get, Query, HttpService } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { RoResponse } from "module/user/type";
import { zip } from "compressing";
import { rmdir, writeFile, accessSync, mkdirSync } from "fs";
import * as path from 'path';
import client from 'ali/ali-oss';
import { Base64 } from 'js-base64';
import { FileService } from "./file.service";
import configPath from "config/server";

@Controller("file-down")
export class FileController {
    constructor(private readonly pictureService: FileService) {}

    @Get('list')
    async getUserList(@Query() request) {
        const [list, totalRecord] = await this.pictureService.getList(request)
        return {code: 0, message: "OK",data: {list, totalRecord}};
    }
}
