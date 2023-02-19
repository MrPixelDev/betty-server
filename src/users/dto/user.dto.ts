import { ApiProperty } from "@nestjs/swagger";
import { SiteEnum } from "src/api/enum/sites.enum";

export interface ICipher {
  cipherText: ArrayBuffer;
  iv: Uint8Array;
}

export class UserDto {
  @ApiProperty({ example: "123@mail.ru", description: "Username" })
  readonly username: string;
  @ApiProperty({ example: "*****", description: "Password" })
  readonly password: string;
}

export class UserApiDto {
  readonly userId: number;
  readonly username: string;
  readonly password: string;
  readonly site: SiteEnum;
}
