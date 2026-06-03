import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CdkService } from './cdk.service';
import { CreateCdkDto, RedeemCdkDto } from './dto';
import { RequireSubscription } from '../auth/subscription.guard';

@Controller('cdk')
@UseGuards(AuthGuard('jwt'))
export class CdkController {
  constructor(private cdkService: CdkService) {}

  /**
   * 获取CDK列表
   */
  @Get()
  async findAll(@Request() req) {
    return this.cdkService.findAll(req.user.userId);
  }

  /**
   * 创建CDK兑换码，支持通过count参数批量创建 - 需要专业版及以上
   */
  @Post()
  @UseGuards(RequireSubscription('pro'))
  async create(@Body() dto: CreateCdkDto, @Query('count') count: string, @Request() req) {
    const num = count ? parseInt(count, 10) : 1;
    if (num > 1) {
      return this.cdkService.createBatch(dto, num, req.user.userId);
    }
    return this.cdkService.create(dto, req.user.userId);
  }

  /**
   * 兑换CDK
   */
  @Post('redeem')
  async redeem(@Body() dto: RedeemCdkDto) {
    return this.cdkService.redeem(dto);
  }

  /**
   * 删除CDK
   */
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.cdkService.remove(id, req.user.userId);
  }
}
