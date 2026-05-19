import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetBrandQuery } from '../../application/queries/get-brand/get-brand.query';
import { BrandDto } from '../../application/dto/brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  get(): Promise<BrandDto> {
    return this.queryBus.execute(new GetBrandQuery());
  }
}
