import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigService } from "nestjs-config";
import { FileService } from "./file.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileEntity } from "./file.entity";

@Module({
    imports: [
        /* MulterModule.registerAsync({
            useFactory: (config: ConfigService) => config.get("file"),
            inject: [ConfigService]
        }) */
        TypeOrmModule.forFeature([FileEntity])
    ],
    controllers: [FileController],
    providers: [FileService],
})
export class FileUploadModule {}
