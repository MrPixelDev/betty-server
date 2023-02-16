import { Response } from "express";
import { UserDto } from "src/users/dto/user.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: UserDto, response: Response): Promise<void>;
    refreshToken(refreshToken: any, response: Response): Promise<void>;
}
