import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateServerDto {
  @IsString()
  name: string;

  @IsString()
  host: string;

  @IsNumber()
  @IsOptional()
  queryPort?: number;

  @IsNumber()
  @IsOptional()
  rconPort?: number;

  @IsString()
  rconPassword: string;

  @IsString()
  @IsOptional()
  logDir?: string;

  @IsNumber()
  @IsOptional()
  maxPlayers?: number;

  @IsString()
  @IsOptional()
  groupId?: string;
}

export class UpdateServerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  host?: string;

  @IsNumber()
  @IsOptional()
  queryPort?: number;

  @IsNumber()
  @IsOptional()
  rconPort?: number;

  @IsString()
  @IsOptional()
  rconPassword?: string;

  @IsString()
  @IsOptional()
  logDir?: string;

  @IsNumber()
  @IsOptional()
  maxPlayers?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
