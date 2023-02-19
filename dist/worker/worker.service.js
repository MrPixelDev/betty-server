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
let WorkerService = class WorkerService {
    constructor(puppetService) {
        this.puppetService = puppetService;
    }
    async updateState(pageContext) {
        console.log("-------------------------updateState--------------------------");
        console.log(pageContext);
        console.log("-------------------------updateState--------------------------");
    }
    async siteLogin(userApiDto) {
        const response = await this.puppetService.login(userApiDto);
        console.log("--------------------sitelogin--------------");
        console.log(response);
        console.log("--------------------sitelogin--------------");
        this.updateState(response.pageContext);
        return response;
    }
    async apiCallSiteLogin(userApiDto) {
        const response = await this.siteLogin(userApiDto);
        return response;
    }
    async apiCallSiteLogout(pageDto) {
        const response = await this.puppetService.logout(pageDto);
    }
};
WorkerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [puppet_service_1.PuppetService])
], WorkerService);
exports.WorkerService = WorkerService;
//# sourceMappingURL=worker.service.js.map