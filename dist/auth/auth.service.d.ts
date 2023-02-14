import { JwtService } from "@nestjs/jwt";
import { UserDto } from "src/users/dto/user.dto";
import { UsersService } from "src/users/users.service";
import { ITokens } from "src/users/dto/tokens.dto";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    private generateTokenPair;
    private validateUser;
    login(userDto: UserDto): Promise<ITokens>;
    refreshToken(refreshToken: string): Promise<ITokens>;
}
