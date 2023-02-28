import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Token, User } from "src/users/users.model";
import { UsersModule } from "src/users/users.module";
import { PuppetModule } from "./puppet/puppet.module";
import { StateModule } from "./state/state.module";
import { StateService } from "./state/state.service";
import { State, StateCredentials, Stock, Strategy } from "./state/state.model";
import { WorkerService } from "./worker.service";

@Module({
  providers: [WorkerService],
  imports: [PuppetModule, UsersModule, StateModule],
  exports: [WorkerService],
})
export class WorkerModule {}
