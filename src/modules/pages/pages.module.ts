import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PagesController } from './interface/controllers/pages.controller';
import { GetPagesHandler } from './application/queries/get-pages/get-pages.handler';
import { PageRepository } from './domain/repositories/page.repository';
import { PrismaPageRepository } from './infrastructure/repositories/prisma-page.repository';

@Module({
  imports: [CqrsModule],
  controllers: [PagesController],
  providers: [
    GetPagesHandler,
    { provide: PageRepository, useClass: PrismaPageRepository },
  ],
})
export class PagesModule {}
