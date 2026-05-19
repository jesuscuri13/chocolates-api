import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { BrandRepository } from '../../domain/repositories/brand.repository';
import { BrandEntity } from '../../domain/entities/brand.entity';

@Injectable()
export class PrismaBrandRepository implements BrandRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(): Promise<BrandEntity | null> {
    const row = await this.prisma.brand.findFirst({
      where: { deletedAt: null },
    });
    if (!row) return null;
    return new BrandEntity(
      row.id,
      row.whatsapp,
      row.whatsappPhone,
      row.email,
      row.location,
    );
  }
}
