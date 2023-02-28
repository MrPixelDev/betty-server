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
exports.WorkerService = void 0;
const common_1 = require("@nestjs/common");
const puppet_service_1 = require("./puppet/puppet.service");
const state_service_1 = require("./state/state.service");
const SportNames_enum_1 = require("./enum/SportNames.enum");
let WorkerService = class WorkerService {
    constructor(stateService, puppetService) {
        this.stateService = stateService;
        this.puppetService = puppetService;
    }
    async siteLogin(userApiDto) {
        const response = await this.puppetService.login(userApiDto);
        return response;
    }
    async parseStrategies(stateId) {
        return [];
    }
    async parseProfit(stateId) {
        return 0;
    }
    async parseBets(getStateDto) {
        const bets = {};
        const fonbetContext = await this.puppetService.getNewPage();
        for (let sportName of Object.values(SportNames_enum_1.SportNames)) {
            const leagues = await this.puppetService.parseLeagues(sportName, getStateDto.bi.pageIndex);
            for (let league of Object.keys(leagues)) {
                leagues[league] = await this.puppetService.parseBetList(leagues[league], sportName, fonbetContext);
            }
            bets[sportName] = leagues;
        }
        return bets;
    }
    async parseState(stateCredentials, getStateDto) {
        const balances = await this.puppetService.parseBalances(getStateDto);
        const profit = await this.parseProfit(stateCredentials.stateId);
        const strategyList = [
            ...(await this.parseStrategies(stateCredentials.stateId)),
        ];
        return {
            stateId: stateCredentials.stateId,
            biBalance: balances.biBalance,
            bkBalance: balances.bkBalance,
            profit,
            strategyList,
        };
    }
    async apiCallSiteLogin(userApiDto) {
        const response = await this.siteLogin(userApiDto);
        return response;
    }
    async apiCallSiteLogout(pageDto) {
        const response = await this.puppetService.logout(pageDto);
        return response;
    }
    async apiCallGetState(getStateDto) {
        const stateCredentials = await this.stateService.findStateCredentials(getStateDto);
        if (!stateCredentials) {
            const newState = await this.stateService.createState(getStateDto);
            const parsedState = await this.parseState(newState.stateCredentials, getStateDto);
            return await this.stateService.updateState(newState.stateCredentials, parsedState);
        }
        const updatedState = await this.parseState(stateCredentials, getStateDto);
        return await this.stateService.updateState(stateCredentials, updatedState);
    }
    async apiCallGetStrategies(getStateDto) {
        const bets = await this.parseBets(getStateDto);
        const marginalitys = [10, 20, 30];
        const obligations = [10, 50, 100];
        const stackSizes = [10, 15, 20];
        return {
            bets,
            marginalitys,
            obligations,
            stackSizes,
        };
    }
};
WorkerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [state_service_1.StateService,
        puppet_service_1.PuppetService])
], WorkerService);
exports.WorkerService = WorkerService;
//# sourceMappingURL=worker.service.js.map