import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { UserApiDto, UserDto } from "src/users/dto/user.dto";
import { UsersService } from "src/users/users.service";
import { WorkerService } from "src/worker/worker.service";
import { GetStateDto, IGetStateResponse, PageDto } from "./dto/api.dto";

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
    // disconnect socket if exists
    return await this.workerService.apiCallSiteLogout(pageDto);
  }

  async getState(getStateDto: GetStateDto): Promise<IGetStateResponse | any> {
    // create websocket
    const response = await this.workerService.apiCallGetState(getStateDto);
    return response;
  }
}
