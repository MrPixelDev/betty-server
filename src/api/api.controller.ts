import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Api")
@Controller("api")
export class ApiController {
  constructor() {}
}
