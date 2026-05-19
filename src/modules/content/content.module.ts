import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ContentController } from './interface/controllers/content.controller';
import { GetContentHandler } from './application/queries/get-content/get-content.handler';
import { PageContentRepository } from './domain/repositories/page-content.repository';
import { PrismaPageContentRepository } from './infrastructure/repositories/prisma-page-content.repository';

@Module({
  imports: [CqrsModule],
  controllers: [ContentController],
  providers: [
    GetContentHandler,
    { provide: PageContentRepository, useClass: PrismaPageContentRepository },
  ],
})
export class ContentModule {}
