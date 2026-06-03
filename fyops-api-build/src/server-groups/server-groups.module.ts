import { Module } from '@nestjs/common';
import { ServerGroupsService } from './server-groups.service';
import { ServerGroupsController } from './server-groups.controller';

@Module({
  controllers: [ServerGroupsController],
  providers: [ServerGroupsService],
  exports: [ServerGroupsService],
})
export class ServerGroupsModule {}
