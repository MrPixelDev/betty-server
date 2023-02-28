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
exports.StateService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const state_model_1 = require("./state.model");
let StateService = class StateService {
    constructor(stateCredentialsRepository, stateRepository) {
        this.stateCredentialsRepository = stateCredentialsRepository;
        this.stateRepository = stateRepository;
    }
    async findStateCredentials(getStateDto) {
        return await this.stateCredentialsRepository.findOne({
            where: {
                userId: getStateDto.userId,
                biName: getStateDto.bi.name,
                biLogin: getStateDto.bi.login,
                bkName: getStateDto.bk.name,
                bkLogin: getStateDto.bk.login,
            },
            include: { all: true },
        });
    }
    async findState(stateCredentials) {
        return await this.stateRepository.findOne({
            where: {
                stateId: stateCredentials.stateId,
            },
            include: { all: true },
        });
    }
    async createState(getStateDto) {
        const newState = await this.stateRepository.create({
            biBalance: 0,
            bkBalance: 0,
            profit: 0,
        });
        const stateCredentials = await this.stateCredentialsRepository.create({
            userId: getStateDto.userId,
            biName: getStateDto.bi.name,
            biLogin: getStateDto.bi.login,
            biPassword: getStateDto.bi.password,
            bkName: getStateDto.bk.name,
            bkLogin: getStateDto.bk.login,
            bkPassword: getStateDto.bk.password,
            stateId: newState.stateId,
        });
        return { stateCredentials, newState };
    }
    async updateState(stateCredentials, state) {
        const current = await this.findState(stateCredentials);
        const updated = await current.update(state);
        return updated;
    }
};
StateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(state_model_1.StateCredentials)),
    __param(1, (0, sequelize_1.InjectModel)(state_model_1.State)),
    __metadata("design:paramtypes", [Object, Object])
], StateService);
exports.StateService = StateService;
//# sourceMappingURL=state.service.js.map