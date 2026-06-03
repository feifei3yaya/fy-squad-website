import { Module } from '@nestjs/common';
import { RconService } from './rcon.service';
import { RconGateway } from './rcon.gateway';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RconService, RconGateway],
  exports: [RconService],
})
export class RconModule {}
