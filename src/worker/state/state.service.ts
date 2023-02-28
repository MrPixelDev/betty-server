import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { GetStateDto, PageDto } from "src/api/dto/api.dto";
import { UserApiDto } from "src/users/dto/user.dto";
import { BalancesDto } from "../dto/worker.dto";
import { State, StateCredentials } from "./state.model";

@Injectable()
export class StateService {
  constructor(
    @InjectModel(StateCredentials)
    private stateCredentialsRepository: typeof StateCredentials,
    @InjectModel(State)
    private stateRepository: typeof State
  ) {}

  async findStateCredentials(getStateDto: GetStateDto) {
    return await this.stateCredentialsRepository.findOne({
      where: {
        userId: getStateDto.userId,
        biName: getStateDto.bi.name,
        biLogin: getStateDto.bi.login,
        bkName: getStateDto.bk.name,
        bkLogin: getStateDto.bk.login,
      },
      include: { all: true },
    });
  }

  async findState(stateCredentials: StateCredentials) {
    return await this.stateRepository.findOne({
      where: {
        stateId: stateCredentials.stateId,
      },
      include: { all: true },
    });
  }

  async createState(getStateDto: GetStateDto) {
    const newState = await this.stateRepository.create({
      biBalance: 0,
      bkBalance: 0,
      profit: 0,
    });
    const stateCredentials = await this.stateCredentialsRepository.create({
      userId: getStateDto.userId,
      biName: getStateDto.bi.name,
      biLogin: getStateDto.bi.login,
      biPassword: getStateDto.bi.password,
      bkName: getStateDto.bk.name,
      bkLogin: getStateDto.bk.login,
      bkPassword: getStateDto.bk.password,
      stateId: newState.stateId,
    });
    // TODO: Ограничения на создание записи
    // TODO: Если выдл ошибку - удалить newState
    return { stateCredentials, newState };
  }

  async updateState(stateCredentials: StateCredentials, state: State) {
    const current = await this.findState(stateCredentials);
    const updated = await current.update(state);
    return updated;
  }
}
