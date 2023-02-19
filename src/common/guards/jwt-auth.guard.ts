import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeaders = req.headers.authorization.split(" ");
      const [bearer, token] = authHeaders;
      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: "401 Неавторизован" });
      }
      // TODO: HOW
      const user = this.jwtService.verify(token, {
        secret: `${process.env.PRIVATE_KEY}` || "SECRET",
      });
      if (user.username && user.userId) {
        req.user = user;
        return true;
      } else {
        throw new UnauthorizedException({ message: "401 Неавторизован" });
      }
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({ message: "401 Неавторизован" });
    }
  }
}
