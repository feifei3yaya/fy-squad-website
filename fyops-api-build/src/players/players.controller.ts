import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlayersService } from './players.service';

@Controller('players')
@UseGuards(AuthGuard('jwt'))
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('serverId') serverId: string,
    @Request() req,
  ) {
    return this.playersService.findAll(search, serverId, req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return this.playersService.findOne(id, req.user.userId);
  }

  @Post(':id/ban')
  async banPlayer(
    @Param('id') id: string,
    @Body() body: { reason: string; duration?: string; serverId: string },
    @Request() req,
  ) {
    return this.playersService.banPlayer(id, body, req.user.userId);
  }

  @Post(':id/kick')
  async kickPlayer(
    @Param('id') id: string,
    @Body() body: { reason: string; serverId: string },
    @Request() req,
  ) {
    return this.playersService.kickPlayer(id, body, req.user.userId);
  }
}
