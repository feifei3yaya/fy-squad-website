import { Module } from '@nestjs/common';
import { BansService } from './bans.service';
import { BansController } from './bans.controller';
import { RconModule } from '../rcon/rcon.module';

@Module({
  imports: [RconModule],
  controllers: [BansController],
  providers: [BansService],
  exports: [BansService],
})
export class BansModule {}
