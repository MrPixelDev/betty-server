import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RateLimitInterceptor } from "src/common/middlewares/RateLimitInterceptor";
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
  }

  @Post("logout")
  async logout(@Body() pageDto: PageDto) {
    return await this.apiService.logout(pageDto);
  }

  @UseInterceptors(new RateLimitInterceptor())
  @Post("getstate")
  async getState(@Body() getStateDto: GetStateDto) {
    return await this.apiService.getState(getStateDto);
  }

  @UseInterceptors(new RateLimitInterceptor())
  @Post("parsestrategies")
  async parseStrategies(@Body() getStateDto: GetStateDto) {
    return await this.apiService.parseStrategies(getStateDto);
  }
}
