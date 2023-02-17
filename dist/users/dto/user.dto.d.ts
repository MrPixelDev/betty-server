export interface ICipher {
    cipherText: ArrayBuffer;
    iv: Uint8Array;
}
export declare class UserDto {
    readonly username: string;
    readonly password: string;
}
