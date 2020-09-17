import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomException } from './filter/http.exception.filter';
import * as cookieParser from 'cookie-parser';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix("api"); // 全局路由前缀

  app.use(cookieParser()); // 使用cookie中间件

  app.useGlobalFilters(new CustomException()); // 启用全局异常过滤器

  app.useWebSocketAdapter(new WsAdapter(app)); // 启动websocket Adapter

  await app.listen(3000);

  if (process.env.NODE_ENV === "prod") {
    console.log("rios")
  }
}

bootstrap();

console.info("\n程序已启动", "端口为3000\n")
