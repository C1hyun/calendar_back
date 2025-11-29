"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: '*',
            methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        });
        const port = process.env.PORT ?? 3000;
        await app.listen(port);
        console.log(`🚀 Server is running on http://localhost:${port}`);
    }
    catch (error) {
        console.error('❌ Error starting server:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map