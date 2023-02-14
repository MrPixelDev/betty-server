import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users.model";

export class TokensDto {
  @ApiProperty({ example: "123@mail.ru", description: "Username" })
  readonly accessToken: string;
  @ApiProperty({ example: "*****", description: "Password" })
  readonly user: User;

  constructor({ accessToken, user }) {
    this.accessToken = accessToken;
    this.user = user;
  }
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
  user: User;
}
