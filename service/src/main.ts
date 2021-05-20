import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomException } from './filter/http.exception.filter';
import * as cookieParser from 'cookie-parser';
import { WsAdapter } from '@nestjs/platform-ws';
import * as history from 'connect-history-api-fallback'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix("api"); // 全局路由前缀

  app.use(cookieParser()); // 使用cookie中间件

  app.useGlobalFilters(new CustomException()); // 启用全局异常过滤器

  app.useWebSocketAdapter(new WsAdapter(app)); // 启动websocket Adapter

  // app.use(history()); // history-api-fallback

  app.enableCors();
  
  await app.listen(3200);
}

bootstrap();

if (process.env.NODE_ENV === "dev") {
    console.log("dev 环境")
}

console.info("\n程序已启动", "端口为3200\n")
