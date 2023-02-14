import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({ example: "123@mail.ru", description: "Username" })
  readonly username: string;
  @ApiProperty({ example: "*****", description: "Password" })
  readonly password: string;
}
