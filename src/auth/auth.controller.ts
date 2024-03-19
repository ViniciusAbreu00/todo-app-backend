import { Controller, Post, Req, UseGuards } from "@nestjs/common";

import { LocalGuard } from "./guards/local.guard";

@Controller("auth")
export class AuthController {
  @Post("login")
  @UseGuards(LocalGuard)
  login(@Req() req: Request | any) {
    return req.user;
  }
}
