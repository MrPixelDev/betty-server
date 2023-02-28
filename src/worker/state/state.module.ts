import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/users/users.model";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { State, StateCredentials, Stock, Strategy } from "./state.model";
import { StateService } from "./state.service";

@Module({
  providers: [StateService],
  imports: [
    SequelizeModule.forFeature([
      User,
      StateCredentials,
      State,
      Strategy,
      Stock,
    ]),
  ],
  exports: [StateService],
})
export class StateModule {}
