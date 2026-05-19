import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { GetBrandQuery } from './get-brand.query';
import { BrandRepository } from '../../../domain/repositories/brand.repository';
import { BrandMapper } from '../../mappers/brand.mapper';
import { BrandDto } from '../../dto/brand.dto';

@QueryHandler(GetBrandQuery)
export class GetBrandHandler implements IQueryHandler<GetBrandQuery, BrandDto> {
  constructor(private readonly repo: BrandRepository) {}

  async execute(): Promise<BrandDto> {
    const brand = await this.repo.find();
    if (!brand) throw new NotFoundException('Brand not configured');
    return BrandMapper.toDto(brand);
  }
}
