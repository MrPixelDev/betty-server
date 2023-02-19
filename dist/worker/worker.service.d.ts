import { PageDto } from "src/api/dto/api.dto";
import { UserApiDto } from "src/users/dto/user.dto";
import { PuppetService } from "./puppet/puppet.service";
export declare class WorkerService {
    private puppetService;
    constructor(puppetService: PuppetService);
    private updateState;
    private siteLogin;
    apiCallSiteLogin(userApiDto: UserApiDto): Promise<any>;
    apiCallSiteLogout(pageDto: PageDto): Promise<void>;
}
