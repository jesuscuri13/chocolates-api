import { BrandEntity } from '../entities/brand.entity';

export abstract class BrandRepository {
  abstract find(): Promise<BrandEntity | null>;
}
