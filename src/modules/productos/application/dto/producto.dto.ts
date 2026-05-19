import { ProductoTag } from '../../domain/entities/producto.entity';

export class ProductoListDto {
  slug: string;
  name: string;
  subtitle: string;
  categoria: string;
  price: string;
  weight: string;
  image: string;
  tag: ProductoTag | null;
  active: boolean;
}

export class ProductoDetailDto extends ProductoListDto {
  images: string[];
  description: string;
  notes: string[];
  preparacion: string;
  conservacion: string;
  origen: string;
}
