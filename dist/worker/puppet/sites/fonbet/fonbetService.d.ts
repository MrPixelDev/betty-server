import * as puppeteer from "puppeteer";
import { IPageContext } from "src/worker/puppet/puppet.service";
import { ILeagueEvents } from "src/worker/dto/worker.dto";
import { SportNames } from "src/worker/enum/SportNames.enum";
export declare class FonbetService {
    sportNamesFonbet: {
        soccer: string;
        ice_hockey: string;
        basketball: string;
        baseball: string;
        tennis: string;
        handball: string;
        volleyball: string;
    };
    constructor();
    parseTextContent(page: puppeteer.Page, el: puppeteer.ElementHandle<Element>, selector: string): Promise<string>;
    parseBetList(leagueEvents: ILeagueEvents, sportName: SportNames, pageContext: IPageContext): Promise<ILeagueEvents>;
    parseBets(page: puppeteer.Page, links: puppeteer.ElementHandle<HTMLAnchorElement>[], leagueEvents: ILeagueEvents, eventListKeys: string[]): Promise<ILeagueEvents>;
}
