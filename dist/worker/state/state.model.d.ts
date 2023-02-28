import { Model } from "sequelize-typescript";
import { User } from "src/users/users.model";
export declare class State extends Model<State> {
    stateId: number;
    biBalance: number;
    bkBalance: number;
    profit: number;
    strategyList: Strategy[];
}
export declare class StateCredentials extends Model<StateCredentials> {
    stateCredentialsId: number;
    userId: number;
    user: User;
    biName: string;
    biLogin: string;
    biPassword: string;
    bkName: string;
    bkLogin: string;
    bkPassword: string;
    stateId: number;
    state: State;
}
export declare class Strategy extends Model<Strategy> {
    strategyId: number;
    stateId: number;
    state: State;
    strategyName: string;
    status: number;
    sportName: string;
    league: string;
    leagueEvent: string;
    bet: string;
    obligation: number;
    marginality: number;
    stackSize: number;
    stackFilled: number;
    stock: Stock[];
}
export declare class Stock extends Model<Stock> {
    strategyId: number;
    strategy: Strategy;
    result: string;
    fonbetCf: number;
    bkCf: number;
    targetCf: number;
    obligationSum: number;
    bkSum: number;
    potentialBiGain: number;
    biGain: number;
    bkGain: number;
}
