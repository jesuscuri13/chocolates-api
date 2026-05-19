import { ProductoEntity } from '../entities/producto.entity';

export abstract class ProductoRepository {
  abstract findAll(): Promise<ProductoEntity[]>;
  abstract findBySlug(slug: string): Promise<ProductoEntity | null>;
}
