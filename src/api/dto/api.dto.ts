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
  status: number;
  biBalance: number;
  bkBalance: number;
  betSum: number;
  stackSize: number;
  stackFilled: number;
  profit: number;
}
