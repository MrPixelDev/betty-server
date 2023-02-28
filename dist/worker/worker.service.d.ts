import { GetStateDto, PageDto } from "src/api/dto/api.dto";
import { UserApiDto } from "src/users/dto/user.dto";
import { PuppetService } from "./puppet/puppet.service";
import { StateService } from "./state/state.service";
import { State } from "./state/state.model";
export declare class WorkerService {
    private stateService;
    private puppetService;
    constructor(stateService: StateService, puppetService: PuppetService);
    private siteLogin;
    private parseStrategies;
    private parseProfit;
    private parseBets;
    private parseState;
    apiCallSiteLogin(userApiDto: UserApiDto): Promise<any>;
    apiCallSiteLogout(pageDto: PageDto): Promise<void>;
    apiCallGetState(getStateDto: GetStateDto): Promise<State>;
    apiCallGetStrategies(getStateDto: GetStateDto): Promise<{
        bets: {};
        marginalitys: number[];
        obligations: number[];
        stackSizes: number[];
    }>;
}
