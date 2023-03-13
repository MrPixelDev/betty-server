import { StrategyDto, GetStateDto } from "src/api/dto/api.dto";
import { AvailableStrategies, State, StateCredentials, Strategy } from "./state.model";
export declare class StateService {
    private stateCredentialsRepository;
    private stateRepository;
    private availableStrategies;
    private strategyRepository;
    constructor(stateCredentialsRepository: typeof StateCredentials, stateRepository: typeof State, availableStrategies: typeof AvailableStrategies, strategyRepository: typeof Strategy);
    findStateCredentials(getStateDto: GetStateDto): Promise<StateCredentials>;
    findState(stateCredentials: StateCredentials): Promise<State>;
    createState(getStateDto: GetStateDto): Promise<{
        stateCredentials: StateCredentials;
        newState: State;
    }>;
    updateState(stateCredentials: StateCredentials, state: State): Promise<State>;
    findAvailableStrategy(strategyDto: StrategyDto): Promise<AvailableStrategies>;
    findStrategy(stateId: number, strategy: Strategy): Promise<Strategy>;
    createStrategy(strategyDto: StrategyDto): Promise<void>;
    getAvailableStrategies(): Promise<AvailableStrategies[]>;
    bindStrategy(stateId: number, strategy: Strategy): Promise<void>;
    setStrategyStatus(strategyId: number, status: string): Promise<Strategy>;
}
