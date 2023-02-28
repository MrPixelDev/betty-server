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
exports.FTFSOObetService = void 0;
const common_1 = require("@nestjs/common");
let FTFSOObetService = class FTFSOObetService {
    constructor() { }
    async login(pageContext, userDto) {
        const page = pageContext.page;
        try {
            page.setViewport({ width: 1281, height: 768 });
            page.setDefaultNavigationTimeout(120000);
            await page.goto(`${process.env.FTFSOOBET_URL}login`);
            const checkForLogin = async () => {
                const title = await page.title();
                const alertEl = await page.$(".alert-danger");
                if (title.toLowerCase().includes("login") && !alertEl) {
                    await page.waitForSelector("input[name=email]");
                    const usernameInput = await page.$("input[name=email]");
                    await usernameInput.type(userDto.username);
                    const passwordInput = await page.$("input[name=password]");
                    await passwordInput.type(userDto.password);
                    const rememberCheckBox = await page.$("input[name=remember]");
                    await rememberCheckBox.click();
                    const submitButton = await page.$("button[type=submit]");
                    await submitButton.click();
                    await page.waitForNavigation();
                    return await checkForLogin();
                }
                else if (title.toLowerCase().includes("ставки")) {
                    const cookies = await page.cookies();
                    return { cookies, pageContext };
                }
                else {
                    throw new common_1.HttpException("Не валидные данные 525600bet", common_1.HttpStatus.BAD_REQUEST);
                }
            };
            return await checkForLogin();
        }
        catch (e) {
            await page.close();
            throw e;
        }
    }
    async parseBalance(pageContext) {
        const page = pageContext.page;
        try {
            await page.waitForSelector("#balanceForChange");
            const trgt = await page.$("#balanceForChange");
            const textContent = await page.evaluate((el) => el.textContent, trgt);
            return +textContent;
        }
        catch (e) {
            throw e;
        }
    }
};
FTFSOObetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FTFSOObetService);
exports.FTFSOObetService = FTFSOObetService;
//# sourceMappingURL=FTFSOObetService.js.map