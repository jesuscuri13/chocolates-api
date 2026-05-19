import { BrandEntity } from '../../domain/entities/brand.entity';
import { BrandDto } from '../dto/brand.dto';

export class BrandMapper {
  static toDto(entity: BrandEntity): BrandDto {
    return {
      whatsapp: entity.whatsapp,
      whatsappPhone: entity.whatsappPhone,
      email: entity.email,
      location: entity.location,
    };
  }
}
