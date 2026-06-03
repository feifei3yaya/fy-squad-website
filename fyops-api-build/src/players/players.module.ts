import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { RconModule } from '../rcon/rcon.module';

@Module({
  imports: [RconModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
