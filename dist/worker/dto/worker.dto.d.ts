export declare class BalancesDto {
    readonly biBalance: number;
    readonly bkBalance: number;
}
export interface ILeagueEvents {
    [leagueEvents: string]: string[];
}
export interface ILeague {
    [league: string]: ILeagueEvents;
}
export interface IBets {
    [sportName: string]: ILeague;
}
