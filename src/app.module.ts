import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactoModule } from './modules/contacto/contacto.module';

// Catalog modules — disabled until DB is configured
// import { PrismaModule } from './shared/prisma/prisma.module';
// import { BrandModule } from './modules/brand/brand.module';
// import { CategoriasModule } from './modules/categorias/categorias.module';
// import { ProductosModule } from './modules/productos/productos.module';
// import { PagesModule } from './modules/pages/pages.module';
// import { ContentModule } from './modules/content/content.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ContactoModule,
    // PrismaModule,
    // BrandModule,
    // CategoriasModule,
    // ProductosModule,
    // PagesModule,
    // ContentModule,
  ],
})
export class AppModule {}
