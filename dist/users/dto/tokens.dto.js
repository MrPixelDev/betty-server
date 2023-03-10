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
exports.TokensDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const users_model_1 = require("../users.model");
class TokensDto {
    constructor({ accessToken, user }) {
        this.accessToken = accessToken;
        this.user = user;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "123@mail.ru", description: "Username" }),
    __metadata("design:type", String)
], TokensDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "*****", description: "Password" }),
    __metadata("design:type", users_model_1.User)
], TokensDto.prototype, "user", void 0);
exports.TokensDto = TokensDto;
//# sourceMappingURL=tokens.dto.js.map