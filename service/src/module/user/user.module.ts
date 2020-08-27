import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthService } from 'module/auth/auth.service';
import { AuthModule } from 'module/auth/auth.module';
import { logger } from 'middleware/logger';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
/* export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(logger)
          .forRoutes(UserController);
    }
} */
