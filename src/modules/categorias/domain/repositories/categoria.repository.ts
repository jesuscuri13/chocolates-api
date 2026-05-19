import { CategoriaEntity } from '../entities/categoria.entity';

export abstract class CategoriaRepository {
  abstract findAll(): Promise<CategoriaEntity[]>;
}
