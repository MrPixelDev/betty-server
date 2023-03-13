import { UserApiDto } from "src/users/dto/user.dto";
import { Strategy } from "src/worker/state/state.model";
import { ApiService } from "./api.service";
import { StrategyDto, GetStateDto, PageDto, StatusDto } from "./dto/api.dto";
export declare class ApiController {
    private apiService;
    constructor(apiService: ApiService);
    parseStrategyModel(): Promise<any>;
    getAvailableStrategies(): Promise<any>;
    login(userApiDto: UserApiDto): Promise<any>;
    logout(pageDto: PageDto): Promise<void>;
    getState(getStateDto: GetStateDto): Promise<any>;
    createStrategy(strategyDto: StrategyDto): Promise<any>;
    bindStrategy(stateId: number, strategy: Strategy): Promise<any>;
    setStrategyStatus(strategyId: number, dto: StatusDto): Promise<any>;
}
