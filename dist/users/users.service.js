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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("./users.model");
const bcrypt = require("bcryptjs");
const sequelize_2 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userRepository, tokenRepository, jwtService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.jwtService = jwtService;
    }
    async updateUser(user) {
        return await this.userRepository.upsert(Object.assign({}, user));
    }
    async createUser(userRegisterDto) {
        return await this.userRepository.create(userRegisterDto);
    }
    async setRole(rolesDto) {
        const user = await this.getUserByUsername(rolesDto.username);
        if (!user) {
            throw new Error("Пользователь не найден");
        }
        await user.$set("role", rolesDto.role);
        return user;
    }
    async addRefreshToken({ refreshToken, user }) {
        this.removeExpiredTokens();
        const isoString = new Date(this.jwtService.decode(refreshToken)["exp"] * 1000).toISOString();
        const expiresAt = new Date(isoString);
        return await this.tokenRepository.create({
            userId: user.userId,
            refreshToken,
            expiresAt,
        });
    }
    async getAllUsers() {
        return await this.userRepository.findAll();
    }
    async getUserByUsername(username) {
        const user = await this.userRepository.findOne({
            where: { username },
            include: { all: true },
        });
        return user;
    }
    async registration(userRegisterDto) {
        const candidate = await this.getUserByUsername(userRegisterDto.username);
        if (candidate) {
            throw new common_1.HttpException("Пользователь с таким email существует", common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userRegisterDto.password, 5);
        const user = await this.createUser(Object.assign(Object.assign({}, userRegisterDto), { password: hashPassword }));
        return user;
    }
    async getUserByRefreshToken(refreshToken) {
        const n = await this.removeExpiredTokens();
        const token = await this.tokenRepository.findOne({
            where: { refreshToken },
            include: { all: true },
        });
        if (!token) {
            throw new Error("Refresh Token not found");
        }
        const user = await this.userRepository.findByPk(token.userId);
        if (!user) {
            throw new Error("Refresh Token not found");
        }
        return user;
    }
    async removeExpiredTokens() {
        console.log("--------------------------------------");
        await this.tokenRepository.destroy({
            where: {
                createdAt: {
                    [sequelize_2.Op.lt]: sequelize_typescript_1.Sequelize.literal(`NOW() - INTERVAL '${process.env.REFRESH_KEY_AGE_S} SECONDS'`),
                },
            },
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(users_model_1.Token)),
    __metadata("design:paramtypes", [Object, Object, jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map