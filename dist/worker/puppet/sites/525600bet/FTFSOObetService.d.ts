import { IPageContext } from "src/worker/puppet/puppet.service";
import { UserDto } from "src/users/dto/user.dto";
export declare class FTFSOObetService {
    constructor();
    login(pageContext: IPageContext, userDto: UserDto): Promise<any>;
}
