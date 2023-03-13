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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const RateLimitInterceptor_1 = require("../common/middlewares/RateLimitInterceptor");
const user_dto_1 = require("../users/dto/user.dto");
const state_model_1 = require("../worker/state/state.model");
const api_service_1 = require("./api.service");
const api_dto_1 = require("./dto/api.dto");
let ApiController = class ApiController {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async parseStrategyModel() {
        return await this.apiService.parseStrategyModel();
    }
    async getAvailableStrategies() {
        return await this.apiService.getAvailableStrategies();
    }
    async login(userApiDto) {
        return await this.apiService.login(userApiDto);
    }
    async logout(pageDto) {
        return await this.apiService.logout(pageDto);
    }
    async getState(getStateDto) {
        return await this.apiService.getState(getStateDto);
    }
    async createStrategy(strategyDto) {
        return await this.apiService.createStrategy(strategyDto);
    }
    async bindStrategy(stateId, strategy) {
        return await this.apiService.bindStrategy(stateId, strategy);
    }
    async setStrategyStatus(strategyId, dto) {
        return await this.apiService.setStrategyStatus(strategyId, dto);
    }
};
__decorate([
    (0, common_1.UseInterceptors)(new RateLimitInterceptor_1.RateLimitInterceptor()),
    (0, common_1.Get)("parsestrategymodel"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "parseStrategyModel", null);
__decorate([
    (0, common_1.UseInterceptors)(new RateLimitInterceptor_1.RateLimitInterceptor()),
    (0, common_1.Get)("getavailablestrategies"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getAvailableStrategies", null);
__decorate([
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserApiDto]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_dto_1.PageDto]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "logout", null);
__decorate([
    (0, common_1.UseInterceptors)(new RateLimitInterceptor_1.RateLimitInterceptor()),
    (0, common_1.Post)("getstate"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_dto_1.GetStateDto]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getState", null);
__decorate([
    (0, common_1.UseInterceptors)(new RateLimitInterceptor_1.RateLimitInterceptor()),
    (0, common_1.Post)("createstrategy"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_dto_1.StrategyDto]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "createStrategy", null);
__decorate([
    (0, common_1.UseInterceptors)(new RateLimitInterceptor_1.RateLimitInterceptor()),
    (0, common_1.Put)("bind-strategy/:state"),
    __param(0, (0, common_1.Param)("state")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, state_model_1.Strategy]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "bindStrategy", null);
__decorate([
    (0, common_1.UseInterceptors)(new RateLimitInterceptor_1.RateLimitInterceptor()),
    (0, common_1.Put)("set-strategy-status/:strategyId"),
    __param(0, (0, common_1.Param)("strategyId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, api_dto_1.StatusDto]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "setStrategyStatus", null);
ApiController = __decorate([
    (0, swagger_1.ApiTags)("Api"),
    (0, common_1.Controller)("api"),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ApiController);
exports.ApiController = ApiController;
//# sourceMappingURL=api.controller.js.map