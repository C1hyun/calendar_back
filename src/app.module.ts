import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const port = parseInt(configService.get<string>('DB_PORT', '3306'), 10);
        const logging =
          configService.get<string>('DB_LOGGING', 'false') === 'true';

        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: Number.isNaN(port) ? 3306 : port,
          username: configService.get<string>('DB_USER', 'root'),
          password: configService.get<string>('DB_PASSWORD', ''),
          database: configService.get<string>('DB_NAME', 'calendar'),
          autoLoadEntities: true,
          synchronize: false,
          charset: 'utf8mb4',
          timezone: 'Z',
          logging,
          keepConnectionAlive: true,
          extra: {
            connectionLimit: 10,
            connectTimeout: 10000,
          },
        };
      },
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
