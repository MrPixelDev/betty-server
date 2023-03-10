import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Cookies } from "src/common/decorators/Cookies.decorator";
import { RateLimitInterceptor } from "src/common/middlewares/RateLimitInterceptor";
import { TokensDto } from "src/users/dto/tokens.dto";
import { UserDto } from "src/users/dto/user.dto";
import { AuthService } from "./auth.service";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // TODO: Body -refreshToken, -user.password, -user.createdat+...
  @Post("/login")
  async login(@Body() userDto: UserDto, @Res() response: Response) {
    const res = await this.authService.login(userDto);
    try {
      const cookieOptions = {
        maxAge: Number(process.env.REFRESH_KEY_AGE_S) * 1000,
        httpOnly: true,
        secure: Boolean(process.env.HTTPS_COOKIE),
      };
      response.cookie("refreshToken", res.refreshToken, cookieOptions);
      response.send(new TokensDto(res));
      // return res;
    } catch (e) {
      console.log(e.message);
      response.send(e);
    }
  }

  // TODO: Use Interceptors
  // TODO: Body -refreshToken, -user.password, -user.createdat+...
  @Get("/refresh")
  async refreshToken(
    @Cookies("refreshToken") refreshToken: any,
    @Res() response: Response
  ) {
    const res = await this.authService.refreshToken(refreshToken);
    if (!refreshToken) {
      throw new Error("No active sessions.");
    }
    try {
      const cookieOptions = {
        maxAge: Number(process.env.REFRESH_KEY_AGE_S) * 1000,
        httpOnly: true,
        secure: Boolean(process.env.HTTPS_COOKIE),
      };
      response.cookie("refreshToken", res.refreshToken, cookieOptions);
      response.send(new TokensDto(res));
      // return res;
    } catch (e) {
      console.log(e.message);
      response.send(e);
    }
  }
}
