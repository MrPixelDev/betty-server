import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { GetStateDto, PageDto, StrategyDto } from "src/api/dto/api.dto";
import { UserApiDto } from "src/users/dto/user.dto";
import { PuppetService } from "./puppet/puppet.service";
import { StateService } from "./state/state.service";
import { State, StateCredentials, Strategy } from "./state/state.model";
import { BalancesDto } from "./dto/worker.dto";
import { SportNames } from "./enum/worker.enum";

const betList = [
  "Total 0.5 OVER",
  "Total 0.5 UNDER",
  "Total 1 OVER",
  "Total 1 UNDER",
  "Total 1.5 OVER",
  "Total 1.5 UNDER",
  "Total 2 OVER",
  "Total 2 UNDER",
  "Total 2.5 OVER",
  "Total 2.5 UNDER",
  "Total 3 OVER",
  "Total 3 UNDER",
  "Total 3.5 OVER",
  "Total 3.5 UNDER",
  "Total 4 OVER",
  "Total 4 UNDER",
  "Total 4.5 OVER",
  "Total 4.5 UNDER",
  "Both teams to score YES",
  "Both teams to score NO",
  "Only one team to score YES",
  "Only one team to score NO",
  "No goals YES",
  "No goals NO",
];
const marginalitys = [10, 20, 30];
const obligations = [10, 50, 100];
const stackSizes = [10, 15, 20];

@Injectable()
export class WorkerService {
  constructor(
    private stateService: StateService,
    private puppetService: PuppetService
  ) {}

  private async siteLogin(userApiDto: UserApiDto) {
    const response = await this.puppetService.login(userApiDto);
    return response;
  }

  private async parseStrategies(stateCredentials: StateCredentials) {
    const state = await this.stateService.findState(stateCredentials);
    return state.strategyList;
  }

  private async parseProfit(stateId: number) {
    return 0;
  }

  private async parseBets() {
    const bets = {};
    const fonbetContext = await this.puppetService.getNewPage();
    const si14Context = await this.puppetService.getNewPage();
    fonbetContext.page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
    );
    for (let sportName of Object.values(SportNames)) {
      const leagues = await this.puppetService.parseLeagues(
        sportName,
        si14Context.index
      );
      for (let league of Object.keys(leagues)) {
        leagues[league] = await this.puppetService.parseBetList(
          leagues[league],
          sportName,
          fonbetContext
        );
      }
      bets[sportName] = leagues;
    }
    fonbetContext.page.close();
    si14Context.page.close();
    return bets;
  }

  private async parseSportsLeagues() {
    const sports = {};
    // const fonbetContext = await this.puppetService.getNewPage();
    const si14Context = await this.puppetService.getNewPage();
    // fonbetContext.page.setUserAgent(
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
    // );
    for (let sportName of Object.values(SportNames)) {
      sports[sportName] = await this.puppetService.parseLeagues(
        sportName,
        si14Context.index
      );
    }
    si14Context.page.close();
    return sports;
  }

  private async parseState(
    stateCredentials: StateCredentials,
    getStateDto: GetStateDto
  ): Promise<any> {
    const balances = await this.puppetService.parseBalances(getStateDto);
    const profit = await this.parseProfit(stateCredentials.stateId);
    // const strategyList = [
    //   ...(await this.parseStrategies(stateCredentials.stateId)),
    // ];
    const strategyList = await this.parseStrategies(stateCredentials);
    return {
      stateId: stateCredentials.stateId,
      biBalance: balances.biBalance,
      bkBalance: balances.bkBalance,
      profit,
      strategyList,
    };
  }

  async apiCallSiteLogin(userApiDto: UserApiDto) {
    const response = await this.siteLogin(userApiDto);
    return response;
  }

  async apiCallSiteLogout(pageDto: PageDto) {
    const response = await this.puppetService.logout(pageDto);
    return response;
  }

  async apiCallGetState(getStateDto: GetStateDto) {
    const stateCredentials = await this.stateService.findStateCredentials(
      getStateDto
    );

    if (!stateCredentials) {
      const newState = await this.stateService.createState(getStateDto);
      const parsedState = await this.parseState(
        newState.stateCredentials,
        getStateDto
      );
      return await this.stateService.updateState(
        newState.stateCredentials,
        parsedState
      );
    }

    const updatedState = await this.parseState(stateCredentials, getStateDto);

    return await this.stateService.updateState(stateCredentials, updatedState);
  }

  async apiCallGetStrategyModel() {
    // const bets = await this.parseBets();
    const leagues = await this.parseSportsLeagues();
    return {
      leagues,
      betList,
      marginalitys,
      obligations,
      stackSizes,
    };
  }

  async createStrategy(strategyDto: StrategyDto) {
    return await this.stateService.createStrategy(strategyDto);
  }

  async getAvailableStrategies() {
    return await this.stateService.getAvailableStrategies();
  }

  async bindStrategy(stateId: number, strartegy: Strategy) {
    return await this.stateService.bindStrategy(stateId, strartegy);
  }

  async setStrategyStatus(strategyId: number, status: string) {
    return await this.stateService.setStrategyStatus(strategyId, status);
  }
}
