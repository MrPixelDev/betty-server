import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as puppeteer from "puppeteer";
import { IPageContext, PuppetService } from "src/worker/puppet/puppet.service";
import { UserDto } from "src/users/dto/user.dto";

@Injectable()
export class FonbetService {
  constructor() {}

  async parseBetList(leagueEvent: string, pageContext: IPageContext) {
    const page = pageContext.page;
    try {
    } catch (e: any) {
      throw e;
    }
  }
}
