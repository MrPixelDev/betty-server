import { SiteEnum } from "../enum/sites.enum";
export declare class PageDto {
    readonly pageIndex: number;
}
export declare class ApiAuthDto {
    readonly name: SiteEnum;
    readonly login: string;
    readonly password: string;
    readonly pageIndex: number;
}
export declare class GetStateDto {
    readonly userId: number;
    readonly bi: ApiAuthDto;
    readonly bk: ApiAuthDto;
}
export interface IGetStateResponse {
    stateId: number;
    biBalance: number;
    bkBalance: number;
    profit: number;
}
export declare class StrategyDto {
    readonly strategyName: string;
    readonly sportName: string;
    readonly league: string;
    readonly bet: string;
    readonly marginality: number;
    readonly obligation: number;
    readonly stackSize: number;
}
export declare class StatusDto {
    readonly status: string;
}
