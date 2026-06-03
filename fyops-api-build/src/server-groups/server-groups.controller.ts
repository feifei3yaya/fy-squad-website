import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServerGroupsService } from './server-groups.service';
import { CreateServerGroupDto, UpdateServerGroupDto } from './dto';

@Controller('server-groups')
@UseGuards(AuthGuard('jwt'))
export class ServerGroupsController {
  constructor(private serverGroupsService: ServerGroupsService) {}

  /**
   * 获取服务器分组列表
   */
  @Get()
  async findAll(@Request() req) {
    return this.serverGroupsService.findAll(req.user.userId);
  }

  /**
   * 创建服务器分组
   */
  @Post()
  async create(@Body() dto: CreateServerGroupDto, @Request() req) {
    return this.serverGroupsService.create(dto, req.user.userId);
  }

  /**
   * 更新服务器分组
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateServerGroupDto, @Request() req) {
    return this.serverGroupsService.update(id, dto, req.user.userId);
  }

  /**
   * 删除服务器分组
   */
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.serverGroupsService.remove(id, req.user.userId);
  }
}
