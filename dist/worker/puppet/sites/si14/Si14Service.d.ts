import * as puppeteer from "puppeteer";
import { IPageContext } from "src/worker/puppet/puppet.service";
import { UserDto } from "src/users/dto/user.dto";
export declare class Si14Service {
    constructor();
    login(pageContext: IPageContext, userDto: UserDto): Promise<{
        responseJson: any;
        cookies: puppeteer.Protocol.Network.Cookie[];
        pageContext: IPageContext;
    }>;
}
