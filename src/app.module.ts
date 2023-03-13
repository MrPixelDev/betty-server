import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User, Token } from "./users/users.model";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ApiModule } from "./api/api.module";
import { PuppetModule } from "./worker/puppet/puppet.module";
import { WorkerModule } from "./worker/worker.module";
import {
  AvailableStrategies,
  State,
  StateCredentials,
  Stock,
  Strategy,
} from "./worker/state/state.model";
import { StateModule } from "./worker/state/state.module";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Token,
        StateCredentials,
        State,
        Strategy,
        Stock,
        AvailableStrategies,
      ],
      autoLoadModels: Boolean(process.env.POSTGRES_AUTO_LOAD_MODELS),
      synchronize: Boolean(process.env.POSTGRES_SYNC),
    }),
    UsersModule,
    AuthModule,
    ApiModule,
    PuppetModule,
    WorkerModule,
    StateModule,
  ],
})
export class AppModule {}
