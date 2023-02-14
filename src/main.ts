import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      `${process.env.ORIGIN_URL}:${process.env.ORIGIN_PORT}`,
      `${process.env.ORIGIN_IP}:${process.env.ORIGIN_PORT}`,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  });
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle("Betty-server")
    .setDescription("Betty backend REST API Documentation")
    .setVersion("1.0.0")
    .addTag("Betty")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
