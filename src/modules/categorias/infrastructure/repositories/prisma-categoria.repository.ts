import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { CategoriaRepository } from '../../domain/repositories/categoria.repository';
import { CategoriaEntity } from '../../domain/entities/categoria.entity';

@Injectable()
export class PrismaCategoriaRepository implements CategoriaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CategoriaEntity[]> {
    const rows = await this.prisma.categoria.findMany({
      where: { deletedAt: null },
      orderBy: { order: 'asc' },
    });
    return rows.map(
      (r) => new CategoriaEntity(r.id, r.name, r.sub, r.desc, r.image, r.order),
    );
  }
}
