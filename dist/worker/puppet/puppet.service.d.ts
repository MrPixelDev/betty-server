import * as puppeteer from "puppeteer";
import { GetStateDto, PageDto } from "src/api/dto/api.dto";
import { UserApiDto } from "src/users/dto/user.dto";
import { ILeague, ILeagueEvents } from "../dto/worker.dto";
import { SportNames } from "../enum/SportNames.enum";
import { FTFSOObetService } from "./sites/525600bet/FTFSOObetService";
import { FonbetService } from "./sites/fonbet/fonbetService";
import { Si14Service } from "./sites/si14/Si14Service";
export interface IPageContext {
    index: number;
    context: puppeteer.BrowserContext;
    page: puppeteer.Page;
}
export declare class PuppetService {
    private si14Service;
    private ftfsooService;
    private fonbetService;
    private browser;
    private pages;
    constructor(si14Service: Si14Service, ftfsooService: FTFSOObetService, fonbetService: FonbetService);
    getNewPage(): Promise<IPageContext>;
    login(userApiDto: UserApiDto): Promise<any>;
    logout(pageDto: PageDto): Promise<void>;
    parseBalances(getStateDto: GetStateDto): Promise<{
        biBalance: number;
        bkBalance: number;
    }>;
    parseLeagues(sportName: string, pageIndex: number): Promise<ILeague>;
    parseBetList(leagueEvents: ILeagueEvents, sportName: SportNames, pageContext: IPageContext): Promise<ILeagueEvents>;
}
