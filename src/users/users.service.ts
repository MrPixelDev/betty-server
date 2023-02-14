import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserDto } from "./dto/user.dto";
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

  async createUser(dto: UserDto) {
    return await this.userRepository.create(dto);
  }

  async addRefreshToken({ refreshToken, user }) {
    const isoString = new Date(
      this.jwtService.decode(refreshToken)["exp"] * 1000
    ).toISOString();
    const expiresAt = new Date(isoString);
    return await this.tokenRepository.create({
      userId: user.id,
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

  async registration(userDto: UserDto) {
    const candidate = await this.getUserByUsername(userDto.username);
    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.createUser({
      ...userDto,
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

  // TODO: envs
  async removeExpiredTokens() {
    // await this.tokenRepository.destroy({
    //   where: {
    //     createdAt: {
    //       [Op.lt]: Sequelize.literal(`NOW() - INTERVAL '30 SECONDS'`),
    //     },
    //   },
    // });
    await this.tokenRepository.destroy({
      where: {
        expiresAt: {
          [Op.lt]: Sequelize.literal("NOW()"),
        },
      },
    });
  }
}
