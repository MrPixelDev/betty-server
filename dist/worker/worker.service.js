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
exports.WorkerService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const puppet_service_1 = require("./puppet/puppet.service");
const worker_model_1 = require("./worker.model");
let WorkerService = class WorkerService {
    constructor(stateCredentialsRepository, stateRepository, puppetService) {
        this.stateCredentialsRepository = stateCredentialsRepository;
        this.stateRepository = stateRepository;
        this.puppetService = puppetService;
    }
    async findStateCredentials(getStateDto) {
        return await this.stateCredentialsRepository.findOne({
            where: {
                userId: getStateDto.userId,
                biName: getStateDto.bi.name,
                biLogin: getStateDto.bi.login,
                biPassword: getStateDto.bi.password,
                bkName: getStateDto.bk.name,
                bkLogin: getStateDto.bk.login,
                bkPassword: getStateDto.bk.password,
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
        console.log("----------------------CREATING STATE----------");
        const newState = await this.stateRepository.create({});
        await this.stateCredentialsRepository.create({
            userId: getStateDto.userId,
            biName: getStateDto.bi.name,
            biLogin: getStateDto.bi.login,
            biPassword: getStateDto.bi.password,
            bkName: getStateDto.bk.name,
            bkLogin: getStateDto.bk.login,
            bkPassword: getStateDto.bk.password,
            stateId: newState.stateId,
        });
        const stateCredentials = await this.findStateCredentials(getStateDto);
        return await this.updateState(getStateDto, stateCredentials);
    }
    async updateState(getStateDto, stateCredentials) {
        const current = await this.findState(stateCredentials);
        console.log("------------------UPDAATEEEE----------");
        console.log(stateCredentials);
        console.log(stateCredentials.state);
        console.log("------------------UPDAATEEEE----------");
        const updated = await this.findState(stateCredentials);
        return updated;
    }
    async siteLogin(userApiDto) {
        const response = await this.puppetService.login(userApiDto);
        return response;
    }
    async apiCallSiteLogin(userApiDto) {
        const response = await this.siteLogin(userApiDto);
        return response;
    }
    async apiCallSiteLogout(pageDto) {
        const response = await this.puppetService.logout(pageDto);
    }
    async apiCallGetState(getStateDto) {
        console.log("---------------SEARCHINGSTATE-------------------");
        const stateCredentials = await this.findStateCredentials(getStateDto);
        if (!stateCredentials) {
            return await this.createState(getStateDto);
        }
        console.log("-------------STATE CREDENTIALS-----------");
        console.log(stateCredentials);
        return await this.updateState(getStateDto, stateCredentials);
    }
};
WorkerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(worker_model_1.StateCredentials)),
    __param(1, (0, sequelize_1.InjectModel)(worker_model_1.State)),
    __metadata("design:paramtypes", [Object, Object, puppet_service_1.PuppetService])
], WorkerService);
exports.WorkerService = WorkerService;
//# sourceMappingURL=worker.service.js.map