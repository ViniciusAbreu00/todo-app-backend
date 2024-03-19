import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { JWTStrategy } from "./strategies/jwt.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTStrategy],
  imports: [
    UserModule,
    JwtModule.register({
      secret: "token-secret-0000",
      signOptions: { expiresIn: "2h" },
    }),
    PassportModule,
  ],
})
export class AuthModule {}
