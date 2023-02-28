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
    parseBetList(leagueEvents: ILeagueEvents, sportName: SportNames, pageContext: IPageContext): Promise<ILeagueEvents>;
    parseBets(page: puppeteer.Page, link: puppeteer.ElementHandle<HTMLAnchorElement>): Promise<string[]>;
}
