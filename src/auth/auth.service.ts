import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "src/users/dto/user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";
import { ITokens } from "src/users/dto/tokens.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private async generateTokenPair(user: User): Promise<ITokens> {
    const payload = { username: user.username, id: user.id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.PRIVATE_KEY || "SECRET",
        expiresIn: `${process.env.PRIVATE_KEY_AGE_S}s`,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_KEY || "REFRESH",
        expiresIn: `${process.env.REFRESH_KEY_AGE_S}s`,
      }),
    ]);
    // await this.saveToken(user, refreshToken);
    // const accessToken = this.jwtService.sign(payload, {
    //   secret: process.env.ACCESS_TOKEN_PRIVATE_KEY || "SECRET",
    //   expiresIn: "15s",
    // });
    await this.usersService.addRefreshToken({
      refreshToken,
      user,
    });
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  private async validateUser(userDto: UserDto) {
    const user = await this.usersService.getUserByUsername(userDto.username);
    if (user) {
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password
      );
      if (passwordEquals) {
        return user;
      }
    }
    throw new UnauthorizedException({
      message: "Некорректный Email или Пароль",
    });
  }

  // async saveToken(user: User, token: string) {
  //   // const tokenData = await this.usersService.getRefreshToken(user.id);
  //   // if (tokenData) {
  //   user.refreshToken = token;
  //   return await this.usersService.updateUser(user);
  //   // }
  //   // const token = await
  // }

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto);
    return this.generateTokenPair(user);
  }

  async refreshToken(refreshToken: string) {
    try {
      const user = await this.usersService.getUserByRefreshToken(refreshToken);
      return this.generateTokenPair(user);
    } catch (e) {
      console.log("err", e.message);
    }
  }
}
