import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { GetStateDto, PageDto } from "src/api/dto/api.dto";
import { UserApiDto } from "src/users/dto/user.dto";
import { PuppetService } from "./puppet/puppet.service";
import { StateService } from "./state/state.service";
import { State, StateCredentials } from "./state/state.model";
import { BalancesDto } from "./dto/worker.dto";
import { SportNames } from "./enum/SportNames.enum";

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

  private async parseStrategies(stateId: number) {
    return [];
  }

  private async parseProfit(stateId: number) {
    return 0;
  }

  private async parseBets(getStateDto: GetStateDto) {
    const bets = {};
    for (let sportName of Object.values(SportNames)) {
      const leagues = await this.puppetService.parseLeagues(
        sportName,
        getStateDto.bi.pageIndex
      );
      bets[sportName] = leagues;
      for (let leagueEvent of Object.values(leagues)) {
        for (let leagueEventKey of Object.keys(leagueEvent)) {
          leagueEvent[leagueEventKey] = ["abc", "bcd"];
        }
      }
    }
    return bets;
  }

  private async parseState(
    stateCredentials: StateCredentials,
    getStateDto: GetStateDto
  ): Promise<any> {
    const balances = await this.puppetService.parseBalances(getStateDto);
    const profit = await this.parseProfit(stateCredentials.stateId);
    const strategyList = [
      ...(await this.parseStrategies(stateCredentials.stateId)),
    ];
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

  async apiCallGetStrategies(getStateDto: GetStateDto) {
    const bets = await this.parseBets(getStateDto);
    // create object strategies{}
    // Go to si14, /viewAll/SportNames.%sportname%
    // for (sportName of Object.keys(SportNames)) {
    // bets[sportname] = parseLeagues(sportname)
    // parseLeagues return parseLeagueEvents(league)
    // parseLeagueEvents return parseBets(leagueEvent)
    // parseBets return bets[]
    // }
    // const bets
    // return {
    // bet
    //
    // }
    const marginalitys = [10, 20, 30];
    const obligations = [10, 50, 100];
    const stackSizes = [10, 15, 20];
    return {
      bets,
      marginalitys,
      obligations,
      stackSizes,
    };
  }
}
