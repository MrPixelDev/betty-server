import { Injectable } from "@nestjs/common";
import * as puppeteer from "puppeteer";
import { Cluster } from "puppeteer-cluster";
import { GetStateDto, PageDto } from "src/api/dto/api.dto";
import { SiteEnum } from "src/api/enum/sites.enum";
import { UserApiDto, UserDto } from "src/users/dto/user.dto";
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

@Injectable()
export class PuppetService {
  // private cluster: Cluster;
  private browser: puppeteer.Browser;
  private pages: IPageContext[];

  constructor(
    private si14Service: Si14Service,
    private ftfsooService: FTFSOObetService,
    private fonbetService: FonbetService
  ) {
    // Cluster.launch({
    //   concurrency: Cluster.CONCURRENCY_BROWSER,
    //   puppeteerOptions: {
    //     headless: false,
    //     defaultViewport: { width: 1024, height: 768 },
    //   },
    // }).then((cluster) => {
    //   this.cluster = cluster;
    //   this.pages = [];
    // });
    puppeteer
      .launch({
        headless: true,
      })
      .then((browser) => {
        this.browser = browser;
        this.pages = [];
      })
      .catch((e) => console.log("--------------------errrrr", e));
  }

  async getNewPage(): Promise<IPageContext> {
    const context = await this.browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    // TODO: index from empty
    const index = this.pages.length;
    this.pages.push({ index, context, page });
    return { index, context, page };
  }

  async login(userApiDto: UserApiDto) {
    const pageContext = await this.getNewPage();
    switch (userApiDto.site) {
      case SiteEnum.SI14:
        return await this.si14Service.login(pageContext, { ...userApiDto });
      case SiteEnum.FTFSOOBET:
        return await this.ftfsooService.login(pageContext, { ...userApiDto });
    }
  }

  async logout(pageDto: PageDto) {
    await this.pages[pageDto.pageIndex].page.close();
  }

  async parseBalances(getStateDto: GetStateDto) {
    let biBalance: number;
    let bkBalance: number;
    switch (getStateDto.bi.name) {
      case SiteEnum.SI14:
        biBalance = await this.si14Service.parseBalance(
          this.pages[getStateDto.bi.pageIndex]
        );
        break;
    }
    switch (getStateDto.bk.name) {
      case SiteEnum.FTFSOOBET:
        bkBalance = await this.ftfsooService.parseBalance(
          this.pages[getStateDto.bk.pageIndex]
        );
        break;
    }
    return {
      biBalance,
      bkBalance,
    };
  }

  async parseLeagues(sportName: string, pageIndex: number): Promise<ILeague> {
    const parsed = await this.si14Service.parseLeagues(
      sportName,
      this.pages[pageIndex]
    );
    return parsed;
  }

  // async parseLeagueEvents(league: string, pageIndex: number) {
  //   return await this.si14Service.parseLeagueEvents(
  //     league,
  //     this.pages[pageIndex]
  //   );
  // }

  async parseBetList(
    leagueEvents: ILeagueEvents,
    sportName: SportNames,
    pageContext: IPageContext
  ) {
    return await this.fonbetService.parseBetList(
      leagueEvents,
      sportName,
      this.pages[pageContext.index]
    );
  }
}
