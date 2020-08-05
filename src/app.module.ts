import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'module/fileManage/file.module';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
    UserModule,
    FileModule
  ]
})
export class AppModule {}

/* ConfigModule.load(resolve(__dirname, 'config', '**!(*.d).{ts,js}')),
TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => config.get('db'),
  inject: [ConfigService],
}), */