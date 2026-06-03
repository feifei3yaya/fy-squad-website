import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateCdkDto {
  @IsString()
  tier: string;

  @IsNumber()
  durationDays: number;

  @IsNumber()
  @IsOptional()
  maxUses?: number;

  @IsDateString()
  @IsOptional()
  expiresAt?: string;
}

export class RedeemCdkDto {
  @IsString()
  code: string;

  @IsString()
  steamId: string;

  @IsString()
  @IsOptional()
  serverId?: string;
}
