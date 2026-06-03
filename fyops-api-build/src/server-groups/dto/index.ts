import { IsString, IsOptional } from 'class-validator';

export class CreateServerGroupDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateServerGroupDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
