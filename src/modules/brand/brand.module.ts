import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BrandController } from './interface/controllers/brand.controller';
import { GetBrandHandler } from './application/queries/get-brand/get-brand.handler';
import { BrandRepository } from './domain/repositories/brand.repository';
import { PrismaBrandRepository } from './infrastructure/repositories/prisma-brand.repository';

@Module({
  imports: [CqrsModule],
  controllers: [BrandController],
  providers: [
    GetBrandHandler,
    { provide: BrandRepository, useClass: PrismaBrandRepository },
  ],
})
export class BrandModule {}
