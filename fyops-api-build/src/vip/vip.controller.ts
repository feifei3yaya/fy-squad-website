import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VipService } from './vip.service';
import { CreateVipDto, UpdateVipDto } from './dto';
import { RequireSubscription } from '../auth/subscription.guard';

@Controller('vip')
@UseGuards(AuthGuard('jwt'))
export class VipController {
  constructor(private vipService: VipService) {}

  /**
   * 获取VIP列表，支持按服务器筛选
   */
  @Get()
  async findAll(@Query('serverId') serverId: string, @Request() req) {
    return this.vipService.findAll(req.user.userId, serverId);
  }

  /**
   * 添加VIP成员 - 需要专业版及以上
   */
  @Post()
  @UseGuards(RequireSubscription('pro'))
  async create(@Body() dto: CreateVipDto, @Request() req) {
    return this.vipService.create(dto, req.user.userId);
  }

  /**
   * 更新VIP信息
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateVipDto, @Request() req) {
    return this.vipService.update(id, dto, req.user.userId);
  }

  /**
   * 删除VIP记录
   */
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.vipService.remove(id, req.user.userId);
  }
}
