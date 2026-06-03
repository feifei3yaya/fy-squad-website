import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateVipDto {
  @IsString()
  playerId: string;

  @IsString()
  serverId: string;

  @IsString()
  @IsOptional()
  tier?: string;

  @IsDateString()
  expiresAt: string;
}

export class UpdateVipDto {
  @IsString()
  @IsOptional()
  tier?: string;

  @IsDateString()
  @IsOptional()
  expiresAt?: string;
}
