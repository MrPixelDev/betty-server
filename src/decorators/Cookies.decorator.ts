import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    function parseStringToJSON(str: string) {
      const arr = str.split(";");
      const obj = {};
      for (let i = 0; i < arr.length; i++) {
        let keyValue = arr[i].split("=");
        obj[keyValue[0].trim()] = keyValue[1].trim();
      }
      return obj;
    }

    if (!request.headers.cookie) {
      throw new Error("No cookie");
    }
    const requestCookie = parseStringToJSON(request.headers.cookie);

    return data ? requestCookie[data] : requestCookie;
  }
);
