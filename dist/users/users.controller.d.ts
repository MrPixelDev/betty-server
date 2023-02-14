import { UserDto } from "./dto/user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    registration(userDto: UserDto): Promise<User>;
    getAll(): Promise<User[]>;
}
