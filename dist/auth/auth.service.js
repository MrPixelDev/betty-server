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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async generateTokenPair(user) {
        const payload = { username: user.username, id: user.id };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.PRIVATE_KEY || "SECRET",
                expiresIn: `${process.env.PRIVATE_KEY_AGE_S}s`,
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.REFRESH_KEY || "REFRESH",
                expiresIn: `${process.env.REFRESH_KEY_AGE_S}s`,
            }),
        ]);
        await this.usersService.addRefreshToken({
            refreshToken,
            user,
        });
        return {
            accessToken,
            refreshToken,
            user,
        };
    }
    async validateUser(userDto) {
        const user = await this.usersService.getUserByUsername(userDto.username);
        if (user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (passwordEquals) {
                return user;
            }
        }
        throw new common_1.UnauthorizedException({
            message: "Некорректный Email или Пароль",
        });
    }
    async login(userDto) {
        const user = await this.validateUser(userDto);
        return this.generateTokenPair(user);
    }
    async refreshToken(refreshToken) {
        try {
            const user = await this.usersService.getUserByRefreshToken(refreshToken);
            return this.generateTokenPair(user);
        }
        catch (e) {
            console.log("err", e.message);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map