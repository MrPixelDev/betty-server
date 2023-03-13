import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { StrategyDto, GetStateDto, PageDto } from "src/api/dto/api.dto";
import { UserApiDto } from "src/users/dto/user.dto";
import { BalancesDto } from "../dto/worker.dto";
import { StrategyStatusEnum } from "../enum/worker.enum";
import {
  AvailableStrategies,
  State,
  StateCredentials,
  Strategy,
} from "./state.model";

@Injectable()
export class StateService {
  constructor(
    @InjectModel(StateCredentials)
    private stateCredentialsRepository: typeof StateCredentials,
    @InjectModel(State)
    private stateRepository: typeof State,
    @InjectModel(AvailableStrategies)
    private availableStrategies: typeof AvailableStrategies,
    @InjectModel(Strategy)
    private strategyRepository: typeof Strategy
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

  async findAvailableStrategy(strategyDto: StrategyDto) {
    return await this.availableStrategies.findOne({
      where: {
        ...strategyDto,
      },
    });
  }

  async findStrategy(stateId: number, strategy: Strategy) {
    return await this.strategyRepository.findOne({
      where: {
        stateId,
        ...strategy,
      },
    });
  }

  async createStrategy(strategyDto: StrategyDto) {
    const strategy = await this.findAvailableStrategy(strategyDto);
    if (strategy) {
      throw new HttpException("Стратегия уже существует", 500);
    }
    await this.availableStrategies.create(strategyDto);
  }

  async getAvailableStrategies() {
    const strategies = await this.availableStrategies.findAll();
    return strategies;
  }

  async bindStrategy(stateId: number, strategy: Strategy) {
    const exists = await this.findStrategy(stateId, strategy);
    if (exists) {
      throw new HttpException("Стратегия уже существует", 500);
    }
    await this.strategyRepository.create({
      stateId,
      ...strategy,
      status: StrategyStatusEnum.STOPPED,
    });
  }

  async setStrategyStatus(strategyId: number, status: string) {
    const current = await this.strategyRepository.findOne({
      where: {
        strategyId,
      },
      include: { all: true },
    });
    return current.update({ status });
  }
}
