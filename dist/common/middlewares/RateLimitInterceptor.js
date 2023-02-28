"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const utils_decorators_1 = require("utils-decorators");
let RateLimitInterceptor = class RateLimitInterceptor {
    intercept(context, next) {
        return next.handle();
    }
};
__decorate([
    (0, utils_decorators_1.rateLimit)({
        allowedCalls: 1,
        timeSpanMs: 1000 * 5,
        keyResolver: (context) => context.switchToHttp().getRequest().headers.authorization.split(" ")[1],
        exceedHandler: () => {
            throw new common_1.HttpException("Rate limit exceeded", common_1.HttpStatus.TOO_MANY_REQUESTS);
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], RateLimitInterceptor.prototype, "intercept", null);
RateLimitInterceptor = __decorate([
    (0, common_1.Injectable)()
], RateLimitInterceptor);
exports.RateLimitInterceptor = RateLimitInterceptor;
//# sourceMappingURL=RateLimitInterceptor.js.map