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
    async parseTextContent(page, el, selector) {
        const textEl = await el.$(selector);
        if (!textEl) {
            return "";
        }
        return await page.evaluate((el) => el.textContent, textEl);
    }
    async parseBetList(leagueEvents, sportName, pageContext) {
        const page = pageContext.page;
        const eventListKeys = Object.keys(leagueEvents);
        try {
            page.setViewport({ width: 1281, height: 4000 });
            page.setDefaultNavigationTimeout(120000);
            if (!page.url().includes(`${this.sportNamesFonbet[sportName]}`)) {
                await page.goto(`${process.env.FONBET_URL}/sports/${this.sportNamesFonbet[sportName]}/?dateInterval=7`);
            }
            await page.waitForSelector(".sport-section-virtual-list--6lYPYe");
            const eventBlock = await page.$(".sport-section-virtual-list--6lYPYe");
            const eventList = await eventBlock.$$(".sport-base-event--pDx9cf");
            const links = [];
            const eventKeys = [];
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
                                    links.push(a);
                                }
                            }
                        }
                    }
                }
            }
            return await this.parseBets(page, links, leagueEvents, eventListKeys);
        }
        catch (e) {
            throw e;
        }
    }
    async parseBets(page, links, leagueEvents, eventListKeys) {
        const hrefs = [];
        for (let link of links) {
            const a = await page.evaluate((a) => a.getAttribute("href"), link);
            hrefs.push(a);
        }
        for (let i = 0; i < hrefs.length; i++) {
            console.log("--------------linkOne---------");
            console.log(hrefs[i]);
            await page.goto(`${process.env.FONBET_URL}${hrefs[i]}`);
            console.log("----------visited----------------");
            await page.waitForSelector(".event-view-tables-wrap--7IFsJk");
            console.log("-----------awaited-----------------");
            const events = await page.$(".event-view-tables-wrap--7IFsJk");
            await page.waitForSelector(".group--3J2kpO", {
                timeout: 120000,
            });
            const eventList = await events.$$(".group--3J2kpO");
            console.log("events", events);
            console.log(eventList.length);
            const betList = [];
            for (let event of eventList) {
                console.log("----------------got through events----------");
                await page.waitForSelector(".market-group-box--z23Vvd");
                const groupBoxes = await event.$$(".market-group-box--z23Vvd");
                for (let groupBox of groupBoxes) {
                    console.log("----------------groupBoxes-----------");
                    const title = await this.parseTextContent(page, groupBox, ".text-new--2WAqa8");
                    console.log(title);
                    switch (title) {
                        case "To qualify":
                            const bets = await groupBox.$$(".cell-wrap--LHnTwg");
                            for (let bet of bets) {
                                const betName = await this.parseTextContent(page, bet, ".t--4zyb4K");
                                const betValue = await this.parseTextContent(page, bet, ".v--1iHcVX");
                                betList.push(`${betName} : ${betValue}`);
                            }
                            break;
                        case "Total goals":
                            const rowCommonsTotalGoals = await groupBox.$$(".row-common--33mLED");
                            console.log("total goals rowcommon");
                            for (let rowCommon of rowCommonsTotalGoals) {
                                const rowCells = await rowCommon.$$(".cell-wrap--LHnTwg");
                                let bet = "";
                                let betName = "";
                                let betValue = "";
                                for (let i = 0; i < rowCells.length; i++) {
                                    switch (i) {
                                        case 0:
                                        case 4:
                                            bet = "";
                                            betName = await this.parseTextContent(page, rowCells[i], ".common-text--2QJ6z9");
                                            if (!betName) {
                                                break;
                                            }
                                            break;
                                        case 1:
                                        case 5:
                                            if (!betName) {
                                                break;
                                            }
                                            betValue = await this.parseTextContent(page, rowCells[i], ".v--1iHcVX");
                                            bet = `${betName} OVER : ${betValue}`;
                                            betList.push(bet);
                                            break;
                                        case 2:
                                        case 6:
                                            if (!betName) {
                                                break;
                                            }
                                            betValue = await this.parseTextContent(page, rowCells[i], ".v--1iHcVX");
                                            bet = `${betName} UNDER : ${betValue}`;
                                            betList.push(bet);
                                            break;
                                    }
                                }
                            }
                            break;
                        case "Goal ‑ no goal":
                            const rowCommonsGnG = await groupBox.$$(".row-common--33mLED");
                            console.log("goal no goal rowcommon");
                            for (let rowCommon of rowCommonsGnG) {
                                console.log(rowCommon);
                                const rowCells = await rowCommon.$$(".cell-wrap--LHnTwg");
                                let bet = "";
                                let betName = "";
                                let betValue = "";
                                for (let i = 0; i < rowCells.length; i++) {
                                    switch (i) {
                                        case 0:
                                        case 4:
                                            bet = "";
                                            betName = await this.parseTextContent(page, rowCells[i], ".common-text--2QJ6z9");
                                            if (!betName) {
                                                break;
                                            }
                                            break;
                                        case 1:
                                        case 5:
                                            if (!betName) {
                                                break;
                                            }
                                            betValue = await this.parseTextContent(page, rowCells[i], ".v--1iHcVX");
                                            bet = `${betName} YES : ${betValue}`;
                                            betList.push(bet);
                                            break;
                                        case 2:
                                        case 6:
                                            if (!betName) {
                                                break;
                                            }
                                            betValue = await this.parseTextContent(page, rowCells[i], ".v--1iHcVX");
                                            bet = `${betName} NO : ${betValue}`;
                                            betList.push(bet);
                                            break;
                                    }
                                }
                            }
                            break;
                        case "Team totals goals":
                            const body1 = await groupBox.$(".body--5rC6wo");
                            const sections1 = await body1.$$(".section--5JAm4a");
                            console.log("team totals goals section");
                            for (let section of sections1) {
                                const header = await section.$(".row-header--5gETmr");
                                const rivalName = await this.parseTextContent(page, header, ".header-text--5VlC6H");
                                const rowCommonsGnG = await groupBox.$$(".row-common--33mLED");
                                for (let rowCommon of rowCommonsGnG) {
                                    const rowCells = await rowCommon.$$(".cell-wrap--LHnTwg");
                                    let bet = "";
                                    let betName = "";
                                    let betValue = "";
                                    for (let i = 0; i < rowCells.length; i++) {
                                        switch (i) {
                                            case 0:
                                                bet = "";
                                                betName = await this.parseTextContent(page, rowCells[i], ".common-text--2QJ6z9");
                                                if (!betName) {
                                                    break;
                                                }
                                                break;
                                            case 1:
                                                if (!betName) {
                                                    break;
                                                }
                                                betValue = await this.parseTextContent(page, rowCells[i], ".v--1iHcVX");
                                                bet = `${rivalName} | ${betName} OVER : ${betValue}`;
                                                betList.push(bet);
                                                break;
                                            case 2:
                                                if (!betName) {
                                                    break;
                                                }
                                                betValue = await this.parseTextContent(page, rowCells[i], ".v--1iHcVX");
                                                bet = `${rivalName} | ${betName} UNDER : ${betValue}`;
                                                betList.push(bet);
                                                break;
                                        }
                                    }
                                }
                            }
                            break;
                        case "Result and statistic":
                            const body2 = await groupBox.$(".body--5rC6wo");
                            const sections2 = await body2.$$(".section--5JAm4a");
                            console.log("team totals goals section");
                            for (let section of sections2) {
                                const header = await section.$(".row-header--5gETmr");
                                const rivalName = await this.parseTextContent(page, header, ".header-text--5VlC6H");
                                const rowCommonsGnG = await groupBox.$$(".row-common--33mLED");
                                for (let rowCommon of rowCommonsGnG) {
                                    const rowCells = await rowCommon.$$(".cell-wrap--LHnTwg");
                                    let bet = "";
                                    let betName = "";
                                    let betValue = "";
                                    for (let i = 0; i < rowCells.length; i++) {
                                        switch (i) {
                                            case 0:
                                                bet = "";
                                                betName = await this.parseTextContent(page, rowCells[i], ".common-text--2QJ6z9");
                                                if (!betName) {
                                                    break;
                                                }
                                                break;
                                            case 1:
                                                if (!betName) {
                                                    break;
                                                }
                                                betValue = await this.parseTextContent(page, rowCells[i], ".v--1iHcVX");
                                                bet = `${rivalName} | ${betName} YES : ${betValue}`;
                                                betList.push(bet);
                                                break;
                                            case 2:
                                                if (!betName) {
                                                    break;
                                                }
                                                betValue = await this.parseTextContent(page, rowCells[i], ".v--1iHcVX");
                                                bet = `${rivalName} | ${betName} NO : ${betValue}`;
                                                betList.push(bet);
                                                break;
                                        }
                                    }
                                }
                            }
                            break;
                    }
                }
            }
            leagueEvents[eventListKeys[i]] = betList;
            console.log(leagueEvents[eventListKeys[i]]);
        }
        return leagueEvents;
    }
};
FonbetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FonbetService);
exports.FonbetService = FonbetService;
//# sourceMappingURL=fonbetService.js.map