"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("../users/users.module");
const puppet_module_1 = require("./puppet/puppet.module");
const state_module_1 = require("./state/state.module");
const worker_service_1 = require("./worker.service");
let WorkerModule = class WorkerModule {
};
WorkerModule = __decorate([
    (0, common_1.Module)({
        providers: [worker_service_1.WorkerService],
        imports: [puppet_module_1.PuppetModule, users_module_1.UsersModule, state_module_1.StateModule],
        exports: [worker_service_1.WorkerService],
    })
], WorkerModule);
exports.WorkerModule = WorkerModule;
//# sourceMappingURL=worker.module.js.map