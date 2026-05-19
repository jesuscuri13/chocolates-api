import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { ProductoRepository } from '../../domain/repositories/producto.repository';
import { ProductoEntity, ProductoTag } from '../../domain/entities/producto.entity';

@Injectable()
export class PrismaProductoRepository implements ProductoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ProductoEntity[]> {
    const rows = await this.prisma.producto.findMany({
      where: { deletedAt: null },
    });
    return rows.map(this.toEntity);
  }

  async findBySlug(slug: string): Promise<ProductoEntity | null> {
    const row = await this.prisma.producto.findFirst({
      where: { slug, deletedAt: null },
    });
    if (!row) return null;
    return this.toEntity(row);
  }

  private toEntity(row: any): ProductoEntity {
    return new ProductoEntity(
      row.slug,
      row.name,
      row.subtitle,
      row.categoriaId,
      row.price,
      row.weight,
      row.image,
      row.images as string[],
      row.tag as ProductoTag | null,
      row.active,
      row.description,
      row.notes as string[],
      row.preparacion,
      row.conservacion,
      row.origen,
    );
  }
}
