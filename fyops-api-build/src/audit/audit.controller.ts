import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuditService } from './audit.service';

@Controller('audit')
@UseGuards(AuthGuard('jwt'))
export class AuditController {
  constructor(private auditService: AuditService) {}

  /**
   * 获取审计日志列表，支持按用户、服务器、操作类型筛选
   */
  @Get()
  async findAll(
    @Query('userId') userId: string,
    @Query('serverId') serverId: string,
    @Query('action') action: string,
    @Request() req,
  ) {
    return this.auditService.findAll(req.user.userId, {
      userId: userId || undefined,
      serverId: serverId || undefined,
      action: action || undefined,
    });
  }
}
