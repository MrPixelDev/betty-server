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
const worker_enum_1 = require("./enum/worker.enum");
const betList = [
    "Total 0.5 OVER",
    "Total 0.5 UNDER",
    "Total 1 OVER",
    "Total 1 UNDER",
    "Total 1.5 OVER",
    "Total 1.5 UNDER",
    "Total 2 OVER",
    "Total 2 UNDER",
    "Total 2.5 OVER",
    "Total 2.5 UNDER",
    "Total 3 OVER",
    "Total 3 UNDER",
    "Total 3.5 OVER",
    "Total 3.5 UNDER",
    "Total 4 OVER",
    "Total 4 UNDER",
    "Total 4.5 OVER",
    "Total 4.5 UNDER",
    "Both teams to score YES",
    "Both teams to score NO",
    "Only one team to score YES",
    "Only one team to score NO",
    "No goals YES",
    "No goals NO",
];
const marginalitys = [10, 20, 30];
const obligations = [10, 50, 100];
const stackSizes = [10, 15, 20];
let WorkerService = class WorkerService {
    constructor(stateService, puppetService) {
        this.stateService = stateService;
        this.puppetService = puppetService;
    }
    async siteLogin(userApiDto) {
        const response = await this.puppetService.login(userApiDto);
        return response;
    }
    async parseStrategies(stateCredentials) {
        const state = await this.stateService.findState(stateCredentials);
        return state.strategyList;
    }
    async parseProfit(stateId) {
        return 0;
    }
    async parseBets() {
        const bets = {};
        const fonbetContext = await this.puppetService.getNewPage();
        const si14Context = await this.puppetService.getNewPage();
        fonbetContext.page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36");
        for (let sportName of Object.values(worker_enum_1.SportNames)) {
            const leagues = await this.puppetService.parseLeagues(sportName, si14Context.index);
            for (let league of Object.keys(leagues)) {
                leagues[league] = await this.puppetService.parseBetList(leagues[league], sportName, fonbetContext);
            }
            bets[sportName] = leagues;
        }
        fonbetContext.page.close();
        si14Context.page.close();
        return bets;
    }
    async parseSportsLeagues() {
        const sports = {};
        const si14Context = await this.puppetService.getNewPage();
        for (let sportName of Object.values(worker_enum_1.SportNames)) {
            sports[sportName] = await this.puppetService.parseLeagues(sportName, si14Context.index);
        }
        si14Context.page.close();
        return sports;
    }
    async parseState(stateCredentials, getStateDto) {
        const balances = await this.puppetService.parseBalances(getStateDto);
        const profit = await this.parseProfit(stateCredentials.stateId);
        const strategyList = await this.parseStrategies(stateCredentials);
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
    async apiCallGetStrategyModel() {
        const leagues = await this.parseSportsLeagues();
        return {
            leagues,
            betList,
            marginalitys,
            obligations,
            stackSizes,
        };
    }
    async createStrategy(strategyDto) {
        return await this.stateService.createStrategy(strategyDto);
    }
    async getAvailableStrategies() {
        return await this.stateService.getAvailableStrategies();
    }
    async bindStrategy(stateId, strartegy) {
        return await this.stateService.bindStrategy(stateId, strartegy);
    }
    async setStrategyStatus(strategyId, status) {
        return await this.stateService.setStrategyStatus(strategyId, status);
    }
};
WorkerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [state_service_1.StateService,
        puppet_service_1.PuppetService])
], WorkerService);
exports.WorkerService = WorkerService;
//# sourceMappingURL=worker.service.js.map