import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigService } from "nestjs-config";

@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: (config: ConfigService) => config.get("file"),
            inject: [ConfigService]
        })
    ],
    controllers: [FileController]
})
export class FileModule {}
