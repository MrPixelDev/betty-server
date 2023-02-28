import { IPageContext } from "src/worker/puppet/puppet.service";
export declare class FonbetService {
    constructor();
    parseBetList(leagueEvent: string, pageContext: IPageContext): Promise<void>;
}
