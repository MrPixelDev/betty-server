import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Token, User } from "src/users/users.model";
import { UsersModule } from "src/users/users.module";
import { PuppetModule } from "./puppet/puppet.module";
import { State, StateCredentials } from "./worker.model";
import { WorkerService } from "./worker.service";

@Module({
  providers: [WorkerService],
  imports: [
    SequelizeModule.forFeature([User, StateCredentials, State]),
    PuppetModule,
    UsersModule,
  ],
  exports: [WorkerService],
})
export class WorkerModule {}
