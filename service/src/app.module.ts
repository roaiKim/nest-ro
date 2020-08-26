import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'module/fileUpload/file.module';
import { HttpRoModule } from 'module/http/http.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'client'),
      exclude: ['/api*']
    }),
    UserModule,
    FileModule,
    HttpRoModule
  ]
})
export class AppModule {}

/* ConfigModule.load(resolve(__dirname, 'config', '**!(*.d).{ts,js}')),
TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => config.get('db'),
  inject: [ConfigService],
}), */