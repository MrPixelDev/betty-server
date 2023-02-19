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
            page.setViewport({ width: 1024, height: 768 });
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
                    await page.close();
                    throw new common_1.HttpException("Неверное имя пользователя или пароль", common_1.HttpStatus.BAD_REQUEST);
                }
                const cookies = await page.cookies();
                return { responseJson, cookies, pageContext };
            }
            await page.close();
            throw new common_1.HttpException("Что-то пошло не так. Попробуйте позже", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (e) {
            await page.close();
            console.log("--------------ERROR-------------");
            console.log(e.message);
            console.log("--------------ERROR-------------");
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
Si14Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Si14Service);
exports.Si14Service = Si14Service;
//# sourceMappingURL=Si14Service.js.map