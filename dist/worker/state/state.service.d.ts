import { GetStateDto } from "src/api/dto/api.dto";
import { State, StateCredentials } from "./state.model";
export declare class StateService {
    private stateCredentialsRepository;
    private stateRepository;
    constructor(stateCredentialsRepository: typeof StateCredentials, stateRepository: typeof State);
    findStateCredentials(getStateDto: GetStateDto): Promise<StateCredentials>;
    findState(stateCredentials: StateCredentials): Promise<State>;
    createState(getStateDto: GetStateDto): Promise<{
        stateCredentials: StateCredentials;
        newState: State;
    }>;
    updateState(stateCredentials: StateCredentials, state: State): Promise<State>;
}
