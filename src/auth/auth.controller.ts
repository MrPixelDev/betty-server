import { Body, Controller, Post, Get, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Cookies } from "src/decorators/Cookies.decorator";
import { TokensDto } from "src/users/dto/tokens.dto";
import { UserDto } from "src/users/dto/user.dto";
import { AuthService } from "./auth.service";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  async login(@Body() userDto: UserDto, @Res() response: Response) {
    try {
      const res = await this.authService.login(userDto);
      const cookieOptions = {
        maxAge: Number(process.env.REFRESH_KEY_AGE_S) * 1000,
        httpOnly: true,
      };
      response.cookie("refreshToken", res.refreshToken, cookieOptions);
      response.send(new TokensDto(res));
      // return res;
    } catch (e) {
      console.log(e.message);
      return e;
    }
  }

  // TODO: Secure flag for cookie
  @Get("/refresh")
  async refreshToken(
    @Cookies("refreshToken") refreshToken: any,
    @Res() response: Response
  ) {
    try {
      if (!refreshToken) {
        throw new Error("No active sessions.");
      }
      const res = await this.authService.refreshToken(refreshToken);
      const cookieOptions = {
        maxAge: Number(process.env.REFRESH_KEY_AGE_S) * 1000,
        httpOnly: true,
      };
      response.cookie("refreshToken", res.refreshToken, cookieOptions);
      response.send(new TokensDto(res));
      // return res;
    } catch (e) {
      console.log(e.message);
      return e;
    }
  }
}
