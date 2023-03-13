import { SiteEnum } from "../enum/sites.enum";

export class PageDto {
  readonly pageIndex: number;
}

export class ApiAuthDto {
  readonly name: SiteEnum;
  readonly login: string;
  readonly password: string;
  readonly pageIndex: number;
}

export class GetStateDto {
  readonly userId: number;
  readonly bi: ApiAuthDto;
  readonly bk: ApiAuthDto;
}

export interface IGetStateResponse {
  stateId: number;
  biBalance: number;
  bkBalance: number;
  profit: number;
}

export class StrategyDto {
  readonly strategyName: string;
  readonly sportName: string;
  readonly league: string;
  readonly bet: string;
  readonly marginality: number;
  readonly obligation: number;
  readonly stackSize: number;
}

export class StatusDto {
  readonly status: string;
}
