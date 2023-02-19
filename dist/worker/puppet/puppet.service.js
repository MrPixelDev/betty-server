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
exports.PuppetService = void 0;
const common_1 = require("@nestjs/common");
const puppeteer = require("puppeteer");
const sites_enum_1 = require("../../api/enum/sites.enum");
const FTFSOObetService_1 = require("./sites/525600bet/FTFSOObetService");
const Si14Service_1 = require("./sites/si14/Si14Service");
let PuppetService = class PuppetService {
    constructor(si14Service, ftfsooService) {
        this.si14Service = si14Service;
        this.ftfsooService = ftfsooService;
        puppeteer
            .launch({
            headless: false,
        })
            .then((browser) => {
            this.browser = browser;
            this.pages = [];
        })
            .catch((e) => console.log("--------------------errrrr", e));
    }
    async getNewPage() {
        const context = await this.browser.createIncognitoBrowserContext();
        const page = await context.newPage();
        const index = this.pages.length;
        this.pages.push({ index, context, page });
        return { index, context, page };
    }
    async login(userApiDto) {
        const pageContext = await this.getNewPage();
        switch (userApiDto.site) {
            case sites_enum_1.SiteEnum.SI14:
                return await this.si14Service.login(pageContext, Object.assign({}, userApiDto));
            case sites_enum_1.SiteEnum.FTFSOOBET:
                return await this.ftfsooService.login(pageContext, Object.assign({}, userApiDto));
        }
    }
    async logout(pageDto) {
        await this.pages[pageDto.pageIndex].page.close();
    }
};
PuppetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Si14Service_1.Si14Service,
        FTFSOObetService_1.FTFSOObetService])
], PuppetService);
exports.PuppetService = PuppetService;
//# sourceMappingURL=puppet.service.js.map