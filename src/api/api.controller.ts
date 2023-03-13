import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RateLimitInterceptor } from "src/common/middlewares/RateLimitInterceptor";
import { UserApiDto } from "src/users/dto/user.dto";
import { Strategy } from "src/worker/state/state.model";
import { ApiService } from "./api.service";
import { StrategyDto, GetStateDto, PageDto, StatusDto } from "./dto/api.dto";

@ApiTags("Api")
@Controller("api")
export class ApiController {
  constructor(private apiService: ApiService) {}

  @UseInterceptors(new RateLimitInterceptor())
  @Get("parsestrategymodel")
  async parseStrategyModel() {
    return await this.apiService.parseStrategyModel();
  }

  @UseInterceptors(new RateLimitInterceptor())
  @Get("getavailablestrategies")
  async getAvailableStrategies() {
    return await this.apiService.getAvailableStrategies();
  }

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
  @Post("createstrategy")
  async createStrategy(@Body() strategyDto: StrategyDto) {
    return await this.apiService.createStrategy(strategyDto);
  }

  @UseInterceptors(new RateLimitInterceptor())
  @Put("bind-strategy/:state")
  async bindStrategy(
    @Param("state") stateId: number,
    @Body() strategy: Strategy
  ) {
    return await this.apiService.bindStrategy(stateId, strategy);
  }

  @UseInterceptors(new RateLimitInterceptor())
  @Put("set-strategy-status/:strategyId")
  async setStrategyStatus(
    @Param("strategyId") strategyId: number,
    @Body() dto: StatusDto
  ) {
    return await this.apiService.setStrategyStatus(strategyId, dto);
  }
}
