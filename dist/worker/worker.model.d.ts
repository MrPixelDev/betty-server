import { Model } from "sequelize-typescript";
import { User } from "src/users/users.model";
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
}
export declare class State extends Model<State> {
    stateId: number;
    stateCredentials: StateCredentials;
    status: string;
    biBalance: number;
    bkBalance: number;
    betSum: number;
    stackSize: number;
    stackFilled: number;
    profit: number;
}
