import { UserApiDto } from "src/users/dto/user.dto";
import { ApiService } from "./api.service";
import { GetStateDto, PageDto } from "./dto/api.dto";
export declare class ApiController {
    private apiService;
    constructor(apiService: ApiService);
    login(userApiDto: UserApiDto): Promise<any>;
    logout(pageDto: PageDto): Promise<void>;
    getState(getStateDto: GetStateDto): Promise<any>;
    parseStrategies(getStateDto: GetStateDto): Promise<any>;
}
