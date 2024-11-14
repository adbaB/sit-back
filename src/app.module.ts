import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EnvConfigModule } from './config/EnvConfig.module';
import { DatabaseModule } from './database/database.module';
import { RefreshAccessMiddleware } from './middleware/refreshAccess.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EnvConfigModule, DatabaseModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, RefreshAccessMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RefreshAccessMiddleware)
      .exclude({ path: 'auth/(.*)', method: RequestMethod.ALL })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
