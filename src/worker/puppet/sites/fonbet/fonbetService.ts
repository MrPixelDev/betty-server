import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as puppeteer from "puppeteer";
import { IPageContext, PuppetService } from "src/worker/puppet/puppet.service";
import { UserDto } from "src/users/dto/user.dto";
import { ILeagueEvents } from "src/worker/dto/worker.dto";
import { SportNames } from "src/worker/enum/SportNames.enum";

@Injectable()
export class FonbetService {
  sportNamesFonbet = {
    soccer: "football",
    ice_hockey: "hockey",
    basketball: "basketball",
    baseball: "baseball",
    tennis: "tennis",
    handball: "handball",
    volleyball: "volleyball",
  };

  constructor() {}

  async parseBetList(
    leagueEvents: ILeagueEvents,
    sportName: SportNames,
    pageContext: IPageContext
  ): Promise<ILeagueEvents> {
    const page = pageContext.page;
    const eventListKeys = Object.keys(leagueEvents);
    try {
      page.setViewport({ width: 1281, height: 4000 });
      page.setDefaultNavigationTimeout(120000);

      if (!page.url().includes(`${this.sportNamesFonbet[sportName]}`)) {
        await page.goto(
          `${process.env.FONBET_URL}sports/${this.sportNamesFonbet[sportName]}/?dateInterval=7`
        );
      }

      await page.waitForSelector(".sport-section-virtual-list--6lYPYe");
      const eventBlock = await page.$(".sport-section-virtual-list--6lYPYe");
      const eventList = await eventBlock.$$(".sport-base-event--pDx9cf");

      for (let event of eventList) {
        const whenBlock = await event.$(
          ".event-block-planned-time__time--16Vaws"
        );
        let when = "Tomorrow";
        if (whenBlock && whenBlock !== null) {
          when = await page.evaluate(
            (el) => el.textContent.split(" ")[0],
            whenBlock
          );
        }
        if (when === "Tomorrow") {
          const a = await event.$("a");
          if (a && a !== null) {
            const aRivals = await page.evaluate(
              (a) => a.innerHTML.split(" — "),
              a
            );
            // console.log("---------------------rivals------------------------");
            // console.log(aRivals);
            for (let eventKey of eventListKeys) {
              let counter = 0;
              // console.log(eventKey);
              for (let rival of aRivals) {
                // console.log(rival, eventKey.includes(rival));
                if (eventKey.includes(rival)) {
                  counter++;
                }
                if (counter === 2) {
                  leagueEvents[eventKey] = await this.parseBets(page, a);
                }
              }
            }
          }
        }
      }
      return leagueEvents;
    } catch (e: any) {
      throw e;
    }
  }

  async parseBets(
    page: puppeteer.Page,
    link: puppeteer.ElementHandle<HTMLAnchorElement>
  ) {
    return ["xyj", "pizda", "djigurda"];
  }
}
