import { Injectable } from "@nestjs/common";
import { PageDto } from "src/api/dto/api.dto";
import { UserApiDto } from "src/users/dto/user.dto";
import { PuppetService } from "./puppet/puppet.service";

@Injectable()
export class WorkerService {
  constructor(private puppetService: PuppetService) {}

  private async updateState(pageContext: any) {
    console.log(
      "-------------------------updateState--------------------------"
    );
    console.log(pageContext);
    console.log(
      "-------------------------updateState--------------------------"
    );
  }

  private async siteLogin(userApiDto: UserApiDto) {
    const response = await this.puppetService.login(userApiDto);
    // async
    console.log("--------------------sitelogin--------------");
    console.log(response);
    console.log("--------------------sitelogin--------------");
    this.updateState(response.pageContext);
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
}
