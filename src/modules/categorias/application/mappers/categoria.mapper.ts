import { CategoriaEntity } from '../../domain/entities/categoria.entity';
import { CategoriaDto } from '../dto/categoria.dto';

export class CategoriaMapper {
  static toDto(entity: CategoriaEntity): CategoriaDto {
    return {
      id: entity.id,
      name: entity.name,
      sub: entity.sub,
      desc: entity.desc,
      image: entity.image,
    };
  }
}
