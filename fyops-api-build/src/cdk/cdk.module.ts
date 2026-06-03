import { Module } from '@nestjs/common';
import { CdkService } from './cdk.service';
import { CdkController } from './cdk.controller';

@Module({
  controllers: [CdkController],
  providers: [CdkService],
  exports: [CdkService],
})
export class CdkModule {}
