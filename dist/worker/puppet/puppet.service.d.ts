import * as puppeteer from "puppeteer";
import { PageDto } from "src/api/dto/api.dto";
import { UserApiDto } from "src/users/dto/user.dto";
import { FTFSOObetService } from "./sites/525600bet/FTFSOObetService";
import { Si14Service } from "./sites/si14/Si14Service";
export interface IPageContext {
    index: number;
    context: puppeteer.BrowserContext;
    page: puppeteer.Page;
}
export declare class PuppetService {
    private si14Service;
    private ftfsooService;
    private browser;
    private pages;
    constructor(si14Service: Si14Service, ftfsooService: FTFSOObetService);
    getNewPage(): Promise<IPageContext>;
    login(userApiDto: UserApiDto): Promise<any>;
    logout(pageDto: PageDto): Promise<void>;
}
