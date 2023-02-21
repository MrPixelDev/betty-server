import { GetStateDto, PageDto } from "src/api/dto/api.dto";
import { UserApiDto } from "src/users/dto/user.dto";
import { PuppetService } from "./puppet/puppet.service";
import { State, StateCredentials } from "./worker.model";
export declare class WorkerService {
    private stateCredentialsRepository;
    private stateRepository;
    private puppetService;
    constructor(stateCredentialsRepository: typeof StateCredentials, stateRepository: typeof State, puppetService: PuppetService);
    private findStateCredentials;
    private findState;
    private createState;
    private updateState;
    private siteLogin;
    apiCallSiteLogin(userApiDto: UserApiDto): Promise<any>;
    apiCallSiteLogout(pageDto: PageDto): Promise<void>;
    apiCallGetState(getStateDto: GetStateDto): Promise<State>;
}
