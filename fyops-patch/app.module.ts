import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServersModule } from './servers/servers.module';
import { PlayersModule } from './players/players.module';
import { RconModule } from './rcon/rcon.module';
import { PrismaModule } from './prisma/prisma.module';
import { BansModule } from './bans/bans.module';
import { VipModule } from './vip/vip.module';
import { CdkModule } from './cdk/cdk.module';
import { AuditModule } from './audit/audit.module';
import { ServerGroupsModule } from './server-groups/server-groups.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    MailModule,
    AuthModule,
    UsersModule,
    ServersModule,
    PlayersModule,
    RconModule,
    BansModule,
    VipModule,
    CdkModule,
    AuditModule,
    ServerGroupsModule,
  ],
})
export class AppModule {}
