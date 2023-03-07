import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesDto, UserDto, UserRegisterDto } from "./dto/user.dto";
import { Token, User } from "./users.model";
import * as bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Token) private tokenRepository: typeof Token,
    private jwtService: JwtService
  ) {}

  async updateUser(user: User) {
    return await this.userRepository.upsert({ ...user });
  }

  async createUser(userRegisterDto: UserRegisterDto) {
    return await this.userRepository.create(userRegisterDto);
  }

  async setRole(rolesDto: RolesDto) {
    const user = await this.getUserByUsername(rolesDto.username);
    if (!user) {
      throw new Error("Пользователь не найден");
    }
    await user.$set("role", rolesDto.role);
    return user;
  }

  // TODO: RefreshTokenDto
  async addRefreshToken({ refreshToken, user }) {
    this.removeExpiredTokens();
    const isoString = new Date(
      this.jwtService.decode(refreshToken)["exp"] * 1000
    ).toISOString();
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

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      include: { all: true },
    });
    return user;
  }

  async registration(userRegisterDto: UserRegisterDto) {
    const candidate = await this.getUserByUsername(userRegisterDto.username);
    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(userRegisterDto.password, 5);
    const user = await this.createUser({
      ...userRegisterDto,
      password: hashPassword,
    });
    return user;
  }

  async getUserByRefreshToken(refreshToken: string) {
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
          [Op.lt]: Sequelize.literal(
            `NOW() - INTERVAL '${process.env.REFRESH_KEY_AGE_S} SECONDS'`
          ),
        },
      },
    });
  }
}
