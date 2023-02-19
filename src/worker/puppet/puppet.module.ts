import { forwardRef, Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { PuppetService } from "./puppet.service";
import { FTFSOObetService } from "./sites/525600bet/FTFSOObetService";
import { Si14Service } from "./sites/si14/Si14Service";

@Module({
  providers: [
    PuppetService,
    // {
    //   provide: PuppetService,
    //   useFactory: (si14Service: Si14Service) => new PuppetService(si14Service),
    //   inject: [forwardRef(() => Si14Service)],
    // },
    Si14Service,
    FTFSOObetService,
  ],
  imports: [UsersModule],
  exports: [PuppetService],
})
export class PuppetModule {}
