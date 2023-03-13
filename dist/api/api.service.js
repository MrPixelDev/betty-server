"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const worker_service_1 = require("../worker/worker.service");
let ApiService = class ApiService {
    constructor(usersService, workerService) {
        this.usersService = usersService;
        this.workerService = workerService;
    }
    async login(userApiDto) {
        return await this.workerService.apiCallSiteLogin(userApiDto);
    }
    async logout(pageDto) {
        return await this.workerService.apiCallSiteLogout(pageDto);
    }
    async getState(getStateDto) {
        const response = await this.workerService.apiCallGetState(getStateDto);
        return response;
    }
    async parseStrategyModel() {
        const response = await this.workerService.apiCallGetStrategyModel();
        return response;
    }
    async createStrategy(strategyDto) {
        const response = await this.workerService.createStrategy(strategyDto);
        return response;
    }
    async getAvailableStrategies() {
        const response = await this.workerService.getAvailableStrategies();
        return response;
    }
    async bindStrategy(stateId, strategy) {
        const response = await this.workerService.bindStrategy(stateId, strategy);
        return response;
    }
    async setStrategyStatus(strategyId, dto) {
        const response = await this.workerService.setStrategyStatus(strategyId, dto.status);
        return response;
    }
};
ApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        worker_service_1.WorkerService])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map