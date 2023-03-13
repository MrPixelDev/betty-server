import { UserApiDto } from "src/users/dto/user.dto";
import { UsersService } from "src/users/users.service";
import { Strategy } from "src/worker/state/state.model";
import { WorkerService } from "src/worker/worker.service";
import { StrategyDto, GetStateDto, IGetStateResponse, PageDto, StatusDto } from "./dto/api.dto";
export declare class ApiService {
    private usersService;
    private workerService;
    constructor(usersService: UsersService, workerService: WorkerService);
    login(userApiDto: UserApiDto): Promise<any>;
    logout(pageDto: PageDto): Promise<void>;
    getState(getStateDto: GetStateDto): Promise<IGetStateResponse | any>;
    parseStrategyModel(): Promise<any>;
    createStrategy(strategyDto: StrategyDto): Promise<any>;
    getAvailableStrategies(): Promise<any>;
    bindStrategy(stateId: number, strategy: Strategy): Promise<any>;
    setStrategyStatus(strategyId: number, dto: StatusDto): Promise<any>;
}
