import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { PageRepository } from '../../domain/repositories/page.repository';
import { PageEntity } from '../../domain/entities/page.entity';

@Injectable()
export class PrismaPageRepository implements PageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PageEntity[]> {
    const rows = await this.prisma.page.findMany({
      where: { deletedAt: null },
      orderBy: { route: 'asc' },
    });
    return rows.map(
      (r) => new PageEntity(r.id, r.route, r.title, r.description, r.ogImage, r.keywords),
    );
  }
}
