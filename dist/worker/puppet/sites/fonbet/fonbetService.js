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
exports.FonbetService = void 0;
const common_1 = require("@nestjs/common");
let FonbetService = class FonbetService {
    constructor() {
        this.sportNamesFonbet = {
            soccer: "football",
            ice_hockey: "hockey",
            basketball: "basketball",
            baseball: "baseball",
            tennis: "tennis",
            handball: "handball",
            volleyball: "volleyball",
        };
    }
    async parseBetList(leagueEvents, sportName, pageContext) {
        const page = pageContext.page;
        const eventListKeys = Object.keys(leagueEvents);
        try {
            page.setViewport({ width: 1281, height: 4000 });
            page.setDefaultNavigationTimeout(120000);
            if (!page.url().includes(`${this.sportNamesFonbet[sportName]}`)) {
                await page.goto(`${process.env.FONBET_URL}sports/${this.sportNamesFonbet[sportName]}/?dateInterval=7`);
            }
            await page.waitForSelector(".sport-section-virtual-list--6lYPYe");
            const eventBlock = await page.$(".sport-section-virtual-list--6lYPYe");
            const eventList = await eventBlock.$$(".sport-base-event--pDx9cf");
            for (let event of eventList) {
                const whenBlock = await event.$(".event-block-planned-time__time--16Vaws");
                let when = "Tomorrow";
                if (whenBlock && whenBlock !== null) {
                    when = await page.evaluate((el) => el.textContent.split(" ")[0], whenBlock);
                }
                if (when === "Tomorrow") {
                    const a = await event.$("a");
                    if (a && a !== null) {
                        const aRivals = await page.evaluate((a) => a.innerHTML.split(" — "), a);
                        for (let eventKey of eventListKeys) {
                            let counter = 0;
                            for (let rival of aRivals) {
                                if (eventKey.includes(rival)) {
                                    counter++;
                                }
                                if (counter === 2) {
                                    leagueEvents[eventKey] = await this.parseBets(page, a);
                                }
                            }
                        }
                    }
                }
            }
            return leagueEvents;
        }
        catch (e) {
            throw e;
        }
    }
    async parseBets(page, link) {
        return ["xyj", "pizda", "djigurda"];
    }
};
FonbetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FonbetService);
exports.FonbetService = FonbetService;
//# sourceMappingURL=fonbetService.js.map