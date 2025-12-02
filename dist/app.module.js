"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const todos_module_1 = require("./todos/todos.module");
const auth_module_1 = require("./auth/auth.module");
const schedules_module_1 = require("./schedules/schedules.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env'],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const port = parseInt(configService.get('DB_PORT', '3306'), 10);
                    const logging = configService.get('DB_LOGGING', 'false') === 'true';
                    return {
                        type: 'mysql',
                        host: configService.get('DB_HOST', 'localhost'),
                        port: Number.isNaN(port) ? 3306 : port,
                        username: configService.get('DB_USER', 'root'),
                        password: configService.get('DB_PASSWORD', ''),
                        database: configService.get('DB_NAME', 'calendar'),
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
            todos_module_1.TodosModule,
            auth_module_1.AuthModule,
            schedules_module_1.SchedulesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map