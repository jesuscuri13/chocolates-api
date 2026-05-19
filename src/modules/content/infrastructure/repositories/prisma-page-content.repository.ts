import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { PageContentRepository } from '../../domain/repositories/page-content.repository';
import { ContentPage, PageContentEntity } from '../../domain/entities/page-content.entity';

@Injectable()
export class PrismaPageContentRepository implements PageContentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByPage(page: ContentPage): Promise<PageContentEntity | null> {
    const row = await this.prisma.pageContent.findFirst({
      where: { page, deletedAt: null },
    });
    if (!row) return null;
    return new PageContentEntity(row.id, row.page as ContentPage, row.content as Record<string, unknown>);
  }
}
