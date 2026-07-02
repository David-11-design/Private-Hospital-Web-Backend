import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AutoDto} from './DTOs/auto.Dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
    @Post('login')
    async login(@Body() dto: AutoDto){
      return await this.authService.login(dto);
    }

}
