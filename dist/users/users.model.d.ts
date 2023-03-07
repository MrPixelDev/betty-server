import { Model } from "sequelize-typescript";
import { StateCredentials } from "src/worker/state/state.model";
interface UserCreationAttrs {
    username: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    userId: number;
    username: string;
    password: string;
    role: string;
    banned: boolean;
    banReason: string;
    refreshTokens: Token[];
    stateCredentials: StateCredentials[];
}
export declare class Token extends Model<Token> {
    refreshTokenId: number;
    userId: number;
    user: User;
    refreshToken: string;
    expiresAt: Date;
}
export {};
