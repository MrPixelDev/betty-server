import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as puppeteer from "puppeteer";
import { IPageContext, PuppetService } from "src/worker/puppet/puppet.service";
import { UserDto } from "src/users/dto/user.dto";

@Injectable()
export class Si14Service {
  constructor() {}

  async login(pageContext: IPageContext, userDto: UserDto) {
    const page = pageContext.page;
    try {
      page.setViewport({ width: 1024, height: 768 });
      page.setDefaultNavigationTimeout(120000);

      await page.goto(process.env.SI14_URL);

      await page.waitForSelector(".login_link");

      const loginButton = await page.$(".login_link");
      await loginButton.click();

      await page.waitForSelector("input[name=username]");

      const usernameInput = await page.$("input[name=username]");
      await usernameInput.type(userDto.username);
      const passwordInput = await page.$("input[name=password]");
      await passwordInput.type(userDto.password);
      const rememberCheckBox = await page.$("input[name=remember]");
      await rememberCheckBox.click();

      const submitButton = await page.$("button[type=submit]");
      await submitButton.click();

      const response = await page.waitForResponse(
        "https://si14.bet/api/user/auth"
      );

      if (response) {
        const responseBody = await response.text();
        const responseJson = JSON.parse(responseBody);
        if (responseJson.message === "User is not present in db.") {
          await page.close();
          throw new HttpException(
            "Неверное имя пользователя или пароль",
            HttpStatus.BAD_REQUEST
          );
        }
        const cookies = await page.cookies();
        return { responseJson, cookies, pageContext };
      }
      await page.close();
      throw new HttpException(
        "Что-то пошло не так. Попробуйте позже",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    } catch (e) {
      await page.close();
      console.log("--------------ERROR-------------");
      console.log(e.message);
      console.log("--------------ERROR-------------");
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
