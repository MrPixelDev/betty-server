import { Injectable } from "@nestjs/common";
import { Request, response } from "express";
import { UserApiDto, UserDto } from "src/users/dto/user.dto";
import { UsersService } from "src/users/users.service";
import { Strategy } from "src/worker/state/state.model";
import { WorkerService } from "src/worker/worker.service";
import {
  StrategyDto,
  GetStateDto,
  IGetStateResponse,
  PageDto,
  StatusDto,
} from "./dto/api.dto";

@Injectable()
export class ApiService {
  constructor(
    private usersService: UsersService,
    private workerService: WorkerService
  ) {}

  async login(userApiDto: UserApiDto) {
    return await this.workerService.apiCallSiteLogin(userApiDto);
    // return this.puppetService.login(site, userDto);
  }

  async logout(pageDto: PageDto) {
    return await this.workerService.apiCallSiteLogout(pageDto);
  }

  async getState(getStateDto: GetStateDto): Promise<IGetStateResponse | any> {
    const response = await this.workerService.apiCallGetState(getStateDto);
    return response;
  }

  async parseStrategyModel(): Promise<any> {
    const response = await this.workerService.apiCallGetStrategyModel();
    return response;
  }

  async createStrategy(strategyDto: StrategyDto): Promise<any> {
    const response = await this.workerService.createStrategy(strategyDto);
    return response;
  }

  async getAvailableStrategies(): Promise<any> {
    const response = await this.workerService.getAvailableStrategies();
    return response;
  }

  async bindStrategy(stateId: number, strategy: Strategy): Promise<any> {
    const response = await this.workerService.bindStrategy(stateId, strategy);
    return response;
  }

  async setStrategyStatus(strategyId: number, dto: StatusDto): Promise<any> {
    const response = await this.workerService.setStrategyStatus(
      strategyId,
      dto.status
    );
    return response;
  }
}
