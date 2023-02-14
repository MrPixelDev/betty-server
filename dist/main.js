"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            `${process.env.ORIGIN_URL}:${process.env.ORIGIN_PORT}`,
            `${process.env.ORIGIN_IP}:${process.env.ORIGIN_PORT}`,
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    });
    app.use(cookieParser());
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Betty-server")
        .setDescription("Betty backend REST API Documentation")
        .setVersion("1.0.0")
        .addTag("Betty")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("/api/docs", app, document);
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
start();
//# sourceMappingURL=main.js.map