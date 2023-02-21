import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { GetStateDto, PageDto } from "src/api/dto/api.dto";
import { UserApiDto } from "src/users/dto/user.dto";
import { PuppetService } from "./puppet/puppet.service";
import { State, StateCredentials } from "./worker.model";

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(StateCredentials)
    private stateCredentialsRepository: typeof StateCredentials,
    @InjectModel(State)
    private stateRepository: typeof State,
    private puppetService: PuppetService
  ) {}

  private async findStateCredentials(getStateDto: GetStateDto) {
    return await this.stateCredentialsRepository.findOne({
      where: {
        userId: getStateDto.userId,
        biName: getStateDto.bi.name,
        biLogin: getStateDto.bi.login,
        biPassword: getStateDto.bi.password,
        bkName: getStateDto.bk.name,
        bkLogin: getStateDto.bk.login,
        bkPassword: getStateDto.bk.password,
      },
      include: { all: true },
    });
  }

  private async findState(stateCredentials: StateCredentials) {
    return await this.stateRepository.findOne({
      where: {
        stateId: stateCredentials.stateId,
      },
      include: { all: true },
    });
  }

  private async createState(getStateDto: GetStateDto) {
    console.log("----------------------CREATING STATE----------");
    const newState = await this.stateRepository.create({});
    await this.stateCredentialsRepository.create({
      userId: getStateDto.userId,
      biName: getStateDto.bi.name,
      biLogin: getStateDto.bi.login,
      biPassword: getStateDto.bi.password,
      bkName: getStateDto.bk.name,
      bkLogin: getStateDto.bk.login,
      bkPassword: getStateDto.bk.password,
      stateId: newState.stateId,
    });
    // Ограничения на создание записи
    // Если выдл ошибку - удалить newState
    const stateCredentials = await this.findStateCredentials(getStateDto);

    return await this.updateState(getStateDto, stateCredentials);
  }

  private async updateState(
    getStateDto: GetStateDto,
    stateCredentials: StateCredentials
  ) {
    const current = await this.findState(stateCredentials);
    // update everything
    console.log("------------------UPDAATEEEE----------");
    console.log(stateCredentials);
    console.log(stateCredentials.state);
    console.log("------------------UPDAATEEEE----------");
    const updated = await this.findState(stateCredentials);
    return updated;
  }

  private async siteLogin(userApiDto: UserApiDto) {
    const response = await this.puppetService.login(userApiDto);
    // async
    // update State
    // async
    return response;
    // Login on site
    // Update State
  }

  async apiCallSiteLogin(userApiDto: UserApiDto) {
    const response = await this.siteLogin(userApiDto);
    // Login on site siteLogin() -
    // it returns { success, site-part-of-state} / badresponse
    // if badresponse - return or throw
    // if success - Ask StateCrd model if statecrd by userid exists.
    // If not exists - create
    // If exists - update statecrds
    // Then update site-part-of-state
    // return {success, site-part-of-state}
    return response;
  }

  async apiCallSiteLogout(pageDto: PageDto) {
    const response = await this.puppetService.logout(pageDto);
  }

  async apiCallGetState(getStateDto: GetStateDto) {
    console.log("---------------SEARCHINGSTATE-------------------");
    const stateCredentials = await this.findStateCredentials(getStateDto);

    if (!stateCredentials) {
      return await this.createState(getStateDto);
    }

    console.log("-------------STATE CREDENTIALS-----------");
    console.log(stateCredentials);
    return await this.updateState(getStateDto, stateCredentials);
  }
}
