import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserApiDto } from "src/users/dto/user.dto";
import { ApiService } from "./api.service";
import { GetStateDto, PageDto } from "./dto/api.dto";

@ApiTags("Api")
@Controller("api")
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Post("/login")
  async login(@Body() userApiDto: UserApiDto) {
    return await this.apiService.login(userApiDto);
    // try {
    // const cookieOptions = {
    //   maxAge: Number(process.env.REFRESH_KEY_AGE_S) * 1000,
    //   httpOnly: true,
    //   secure: Boolean(process.env.HTTPS_COOKIE),
    // };
    // response.cookie("refreshToken", res.refreshToken, cookieOptions);
    // response.send(new TokensDto(res));
    // return res;
    // } catch (e) {
    //   console.log(e.message);
    //   response.send(e);
    // }
  }

  @Post("logout")
  async logout(@Body() pageDto: PageDto) {
    return await this.apiService.logout(pageDto);
  }

  @Post("getstate")
  async getState(@Body() getStateDto: GetStateDto) {
    return await this.apiService.getState(getStateDto);
  }

  // TODO: Secure flag for cookie
  // @Get("/refresh")
  // async refreshToken(
  //   @Cookies("refreshToken") refreshToken: any,
  //   @Res() response: Response
  // ) {
  //   const res = await this.authService.refreshToken(refreshToken);
  //   if (!refreshToken) {
  //     throw new Error("No active sessions.");
  //   }
  //   try {
  //     const cookieOptions = {
  //       maxAge: Number(process.env.REFRESH_KEY_AGE_S) * 1000,
  //       httpOnly: true,
  //       secure: Boolean(process.env.HTTPS_COOKIE),
  //     };
  //     response.cookie("refreshToken", res.refreshToken, cookieOptions);
  //     response.send(new TokensDto(res));
  //     // return res;
  //   } catch (e) {
  //     console.log(e.message);
  //     response.send(e);
  //   }
  // }
}
