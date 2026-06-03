import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServersService } from './servers.service';
import { CreateServerDto, UpdateServerDto } from './dto';

@Controller('servers')
@UseGuards(AuthGuard('jwt'))
export class ServersController {
  constructor(private serversService: ServersService) {}

  @Get()
  async findAll(@Request() req) {
    return this.serversService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return this.serversService.findOne(id, req.user.userId);
  }

  @Post()
  async create(@Body() dto: CreateServerDto, @Request() req) {
    return this.serversService.create(dto, req.user.userId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateServerDto, @Request() req) {
    return this.serversService.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.serversService.remove(id, req.user.userId);
  }

  @Post(':id/refresh')
  async refreshStatus(@Param('id') id: string, @Request() req) {
    return this.serversService.refreshStatus(id, req.user.userId);
  }

  @Get(':id/players')
  async getPlayers(@Param('id') id: string, @Request() req) {
    return this.serversService.getPlayers(id, req.user.userId);
  }

  @Post(':id/rcon')
  async executeRcon(
    @Param('id') id: string,
    @Body() body: { command: string },
    @Request() req,
  ) {
    return this.serversService.executeRcon(id, body.command, req.user.userId);
  }
}
