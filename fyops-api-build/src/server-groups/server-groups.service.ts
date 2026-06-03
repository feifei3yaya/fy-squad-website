import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServerGroupDto, UpdateServerGroupDto } from './dto';

@Injectable()
export class ServerGroupsService {
  constructor(private prisma: PrismaService) {}

  /**
   * 查询服务器分组列表，只返回当前用户的分组
   */
  async findAll(userId: string) {
    return this.prisma.serverGroup.findMany({
      where: { ownerId: userId },
      include: {
        _count: {
          select: { servers: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * 查询单个分组详情
   */
  async findOne(id: string, userId: string) {
    const group = await this.prisma.serverGroup.findFirst({
      where: { id, ownerId: userId },
      include: {
        servers: {
          select: {
            id: true,
            name: true,
            status: true,
            currentPlayers: true,
            maxPlayers: true,
          },
        },
      },
    });

    if (!group) {
      throw new NotFoundException('服务器分组不存在');
    }

    return group;
  }

  /**
   * 创建服务器分组
   */
  async create(dto: CreateServerGroupDto, userId: string) {
    return this.prisma.serverGroup.create({
      data: {
        name: dto.name,
        region: dto.region,
        description: dto.description,
        ownerId: userId,
      },
    });
  }

  /**
   * 更新服务器分组
   */
  async update(id: string, dto: UpdateServerGroupDto, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.serverGroup.update({
      where: { id },
      data: dto,
    });
  }

  /**
   * 删除服务器分组
   */
  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.serverGroup.delete({
      where: { id },
    });
  }
}
