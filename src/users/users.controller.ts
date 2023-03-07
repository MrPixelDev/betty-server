import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesDto, UserDto, UserRegisterDto } from "./dto/user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  // TODO: Body -refreshToken, -user.password, -user.createdat+...
  @Post("/registration")
  registration(@Body() userRegisterDto: UserRegisterDto) {
    return this.usersService.registration(userRegisterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/set-role")
  setRole(@Body() rolesDto: RolesDto) {
    return this.usersService.setRole(rolesDto);
  }

  @ApiOperation({ summary: "Return all users" })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
}
