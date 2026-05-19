import { ProductoEntity } from '../../domain/entities/producto.entity';
import { ProductoDetailDto, ProductoListDto } from '../dto/producto.dto';

export class ProductoMapper {
  static toListDto(entity: ProductoEntity): ProductoListDto {
    return {
      slug: entity.slug,
      name: entity.name,
      subtitle: entity.subtitle,
      categoria: entity.categoria,
      price: entity.price,
      weight: entity.weight,
      image: entity.image,
      tag: entity.tag,
      active: entity.active,
    };
  }

  static toDetailDto(entity: ProductoEntity): ProductoDetailDto {
    return {
      ...ProductoMapper.toListDto(entity),
      images: entity.images,
      description: entity.description,
      notes: entity.notes,
      preparacion: entity.preparacion,
      conservacion: entity.conservacion,
      origen: entity.origen,
    };
  }
}
