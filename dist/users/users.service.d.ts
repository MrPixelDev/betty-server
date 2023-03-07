import { RolesDto, UserRegisterDto } from "./dto/user.dto";
import { Token, User } from "./users.model";
import { JwtService } from "@nestjs/jwt";
export declare class UsersService {
    private userRepository;
    private tokenRepository;
    private jwtService;
    constructor(userRepository: typeof User, tokenRepository: typeof Token, jwtService: JwtService);
    updateUser(user: User): Promise<[User, boolean]>;
    createUser(userRegisterDto: UserRegisterDto): Promise<User>;
    setRole(rolesDto: RolesDto): Promise<User>;
    addRefreshToken({ refreshToken, user }: {
        refreshToken: any;
        user: any;
    }): Promise<Token>;
    getAllUsers(): Promise<User[]>;
    getUserByUsername(username: string): Promise<User>;
    registration(userRegisterDto: UserRegisterDto): Promise<User>;
    getUserByRefreshToken(refreshToken: string): Promise<User>;
    removeExpiredTokens(): Promise<void>;
}
