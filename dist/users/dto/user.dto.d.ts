import { SiteEnum } from "src/api/enum/sites.enum";
export interface ICipher {
    cipherText: ArrayBuffer;
    iv: Uint8Array;
}
export declare class UserDto {
    readonly username: string;
    readonly password: string;
}
export declare class UserApiDto {
    readonly userId: number;
    readonly username: string;
    readonly password: string;
    readonly site: SiteEnum;
}
