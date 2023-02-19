import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as puppeteer from "puppeteer";
import { IPageContext } from "src/worker/puppet/puppet.service";
import { UserDto } from "src/users/dto/user.dto";

@Injectable()
export class FTFSOObetService {
  constructor() {}

  async login(pageContext: IPageContext, userDto: UserDto) {
    const page = pageContext.page;
    try {
      page.setViewport({ width: 1024, height: 768 });
      page.setDefaultNavigationTimeout(120000);

      await page.goto(`${process.env.FTFSOOBET_URL}login`);

      const checkForLogin = async () => {
        const title = await page.title();
        const alertEl = await page.$(".alert-danger");
        if (title.toLowerCase().includes("login") && !alertEl) {
          await page.waitForSelector("input[name=email]");
          const usernameInput = await page.$("input[name=email]");
          await usernameInput.type(userDto.username);
          const passwordInput = await page.$("input[name=password]");
          await passwordInput.type(userDto.password);
          const rememberCheckBox = await page.$("input[name=remember]");
          await rememberCheckBox.click();

          const submitButton = await page.$("button[type=submit]");
          await submitButton.click();
          await page.waitForNavigation();
          return await checkForLogin();
        } else if (title.toLowerCase().includes("ставки")) {
          const cookies = await page.cookies();
          return { cookies, pageContext };
        } else {
          await page.close();
          throw new HttpException(
            "Неверное имя пользователя или пароль",
            HttpStatus.BAD_REQUEST
          );
        }
      };

      return await checkForLogin();
    } catch (e) {
      await page.close();
      console.log("--------------ERROR-------------");
      console.log(e.message);
      console.log("--------------ERROR-------------");
      throw new HttpException(
        "Неверное имя пользователя или пароль",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
