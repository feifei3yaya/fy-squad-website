import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * 获取仪表盘统计数据
   */
  @Get('stats')
  async getStats(@Request() req) {
    return this.usersService.getStats(req.user.userId);
  }
}
