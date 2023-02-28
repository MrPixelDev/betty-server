export declare class BalancesDto {
    readonly biBalance: number;
    readonly bkBalance: number;
}
export interface ILeague {
    [league: string]: {
        [leagueEvent: string]: string[];
    };
}
export interface IBets {
    [sportName: string]: ILeague;
}
