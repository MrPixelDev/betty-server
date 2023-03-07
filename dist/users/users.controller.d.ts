import { RolesDto, UserRegisterDto } from "./dto/user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    registration(userRegisterDto: UserRegisterDto): Promise<User>;
    setRole(rolesDto: RolesDto): Promise<User>;
    getAll(): Promise<User[]>;
}
