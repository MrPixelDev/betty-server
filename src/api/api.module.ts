import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { WorkerModule } from "src/worker/worker.module";
import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [UsersModule, WorkerModule],
  exports: [ApiService],
})
export class ApiModule {}
