"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookies = void 0;
const common_1 = require("@nestjs/common");
exports.Cookies = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    function parseStringToJSON(str) {
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
});
//# sourceMappingURL=Cookies.decorator.js.map