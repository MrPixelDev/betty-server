import { User } from "../users.model";
export declare class TokensDto {
    readonly accessToken: string;
    readonly user: User;
    constructor({ accessToken, user }: {
        accessToken: any;
        user: any;
    });
}
export interface ITokens {
    accessToken: string;
    refreshToken: string;
    user: User;
}
