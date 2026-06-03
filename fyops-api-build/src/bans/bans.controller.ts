import { Controller, Get, Delete, Post, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BansService } from './bans.service';

@Controller('bans')
@UseGuards(AuthGuard('jwt'))
export class BansController {
  constructor(private bansService: BansService) {}

  /**
   * 获取封禁列表，支持按服务器和状态筛选
   */
  @Get()
  async findAll(
    @Query('serverId') serverId: string,
    @Query('isActive') isActive: string,
    @Request() req,
  ) {
    const active = isActive === undefined ? undefined : isActive === 'true';
    return this.bansService.findAll(req.user.userId, serverId, active);
  }

  /**
   * 获取单个封禁记录详情
   */
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return this.bansService.findOne(id, req.user.userId);
  }

  /**
   * 解封操作
   */
  @Post(':id/unban')
  async unban(@Param('id') id: string, @Request() req) {
    return this.bansService.unban(id, req.user.userId);
  }

  /**
   * 删除封禁记录
   */
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.bansService.remove(id, req.user.userId);
  }
}
