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
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("./users/users.model");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const api_module_1 = require("./api/api.module");
const puppet_module_1 = require("./worker/puppet/puppet.module");
const worker_module_1 = require("./worker/worker.module");
const worker_model_1 = require("./worker/worker.model");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: "postgres",
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [users_model_1.User, users_model_1.Token, worker_model_1.StateCredentials, worker_model_1.State],
                autoLoadModels: Boolean(process.env.POSTGRES_AUTO_LOAD_MODELS),
                synchronize: Boolean(process.env.POSTGRES_SYNC),
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            api_module_1.ApiModule,
            puppet_module_1.PuppetModule,
            worker_module_1.WorkerModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map