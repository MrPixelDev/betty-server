import { ApiProperty } from "@nestjs/swagger";

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
