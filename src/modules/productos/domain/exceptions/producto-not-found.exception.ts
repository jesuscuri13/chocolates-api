import { NotFoundException } from '@nestjs/common';

export class ProductoNotFoundException extends NotFoundException {
  constructor(slug: string) {
    super(`Producto '${slug}' not found`);
  }
}
