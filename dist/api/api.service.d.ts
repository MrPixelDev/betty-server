import { UserApiDto } from "src/users/dto/user.dto";
import { UsersService } from "src/users/users.service";
import { WorkerService } from "src/worker/worker.service";
import { GetStateDto, IGetStateResponse, PageDto } from "./dto/api.dto";
export declare class ApiService {
    private usersService;
    private workerService;
    constructor(usersService: UsersService, workerService: WorkerService);
    login(userApiDto: UserApiDto): Promise<any>;
    logout(pageDto: PageDto): Promise<void>;
    getState(getStateDto: GetStateDto): Promise<IGetStateResponse | any>;
    parseStrategies(getStateDto: GetStateDto): Promise<any>;
}
