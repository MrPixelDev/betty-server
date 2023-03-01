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
exports.Si14Service = void 0;
const common_1 = require("@nestjs/common");
let Si14Service = class Si14Service {
    constructor() { }
    async login(pageContext, userDto) {
        const page = pageContext.page;
        try {
            page.setViewport({ width: 1281, height: 768 });
            page.setDefaultNavigationTimeout(120000);
            await page.goto(process.env.SI14_URL);
            await page.waitForSelector(".login_link");
            const loginButton = await page.$(".login_link");
            await loginButton.click();
            await page.waitForSelector("input[name=username]");
            const usernameInput = await page.$("input[name=username]");
            await usernameInput.type(userDto.username);
            const passwordInput = await page.$("input[name=password]");
            await passwordInput.type(userDto.password);
            const rememberCheckBox = await page.$("input[name=remember]");
            await rememberCheckBox.click();
            const submitButton = await page.$("button[type=submit]");
            await submitButton.click();
            const response = await page.waitForResponse("https://si14.bet/api/user/auth");
            if (response) {
                const responseBody = await response.text();
                const responseJson = JSON.parse(responseBody);
                if (responseJson.message === "User is not present in db.") {
                    throw new common_1.HttpException("Не валидные данные si14", common_1.HttpStatus.BAD_REQUEST);
                }
                const cookies = await page.cookies();
                return { responseJson, cookies, pageContext };
            }
            throw new common_1.HttpException("Что-то пошло не так. Попробуйте позже", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (e) {
            await page.close();
            throw e;
        }
    }
    async parseBalance(pageContext) {
        const page = pageContext.page;
        try {
            await page.waitForXPath("/html/body/div[1]/header/div[3]/div[1]/div[1]/div/span/text()[2]");
            const trgt = await page.$x("/html/body/div[1]/header/div[3]/div[1]/div[1]/div/span/text()[2]");
            const textContent = await page.evaluate((element) => element.textContent, trgt[0]);
            return textContent === "-" ? 0.001 : Number(textContent);
        }
        catch (e) {
            throw e;
        }
    }
    async parseLeagues(sportName, pageContext) {
        const page = pageContext.page;
        try {
            await page.goto(`${process.env.SI14_URL}/viewAll/${sportName}`);
            await page.waitForSelector(".bets-table__body");
            const tomorrowBtns = await page.$$(".league-header__buttons__button ");
            await tomorrowBtns[3].click();
            await page.waitForSelector(".bets-table__body");
            const pages = await page.$(".pagination-component");
            const pagesLength = await pages.$$(".circle");
            await page.waitForSelector("tbody.bets-table__body");
            const table = await page.$("tbody.bets-table__body");
            const tableRows = await table.$$("tr");
            const leagues = {};
            for (let i = 0; i < pagesLength.length; i++) {
                for (let j = 0; j < tableRows.length; j++) {
                    const leagueEvents = {};
                    const league = await tableRows[j].$$("td.bets-table-cell__league > *");
                    const leagueText = await page.evaluate((el) => el.textContent, league[league.length - 1]);
                    const rivals = await tableRows[j].$(".bets-table-cell__rivals");
                    const leagueEventText = await page.evaluate((el) => el.innerHTML.replace("<br>", " - "), rivals);
                    if (leagues[leagueText]) {
                        leagues[leagueText][leagueEventText] = [];
                    }
                    else {
                        leagueEvents[leagueEventText] = [];
                        leagues[leagueText] = leagueEvents;
                    }
                }
                const rightBtns = await pages.$$("> *");
                const nextBtns = await rightBtns[rightBtns.length - 1].$$("button.pagination-block");
                await nextBtns[0].click();
            }
            console.log(JSON.stringify(leagues));
            return leagues;
        }
        catch (e) {
            throw e;
        }
    }
};
Si14Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Si14Service);
exports.Si14Service = Si14Service;
//# sourceMappingURL=Si14Service.js.map