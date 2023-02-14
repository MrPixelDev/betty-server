import { Model } from "sequelize-typescript";
interface UserCreationAttrs {
    username: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    username: string;
    password: string;
    banned: boolean;
    banReason: string;
    refreshTokens: Token[];
}
export declare class Token extends Model<Token> {
    refreshTokenId: number;
    userId: number;
    user: User;
    refreshToken: string;
    expiresAt: Date;
}
export {};
