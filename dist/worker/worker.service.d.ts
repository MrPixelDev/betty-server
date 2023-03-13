import { GetStateDto, PageDto, StrategyDto } from "src/api/dto/api.dto";
import { UserApiDto } from "src/users/dto/user.dto";
import { PuppetService } from "./puppet/puppet.service";
import { StateService } from "./state/state.service";
import { State, Strategy } from "./state/state.model";
export declare class WorkerService {
    private stateService;
    private puppetService;
    constructor(stateService: StateService, puppetService: PuppetService);
    private siteLogin;
    private parseStrategies;
    private parseProfit;
    private parseBets;
    private parseSportsLeagues;
    private parseState;
    apiCallSiteLogin(userApiDto: UserApiDto): Promise<any>;
    apiCallSiteLogout(pageDto: PageDto): Promise<void>;
    apiCallGetState(getStateDto: GetStateDto): Promise<State>;
    apiCallGetStrategyModel(): Promise<{
        leagues: {};
        betList: string[];
        marginalitys: number[];
        obligations: number[];
        stackSizes: number[];
    }>;
    createStrategy(strategyDto: StrategyDto): Promise<void>;
    getAvailableStrategies(): Promise<import("./state/state.model").AvailableStrategies[]>;
    bindStrategy(stateId: number, strartegy: Strategy): Promise<void>;
    setStrategyStatus(strategyId: number, status: string): Promise<Strategy>;
}
