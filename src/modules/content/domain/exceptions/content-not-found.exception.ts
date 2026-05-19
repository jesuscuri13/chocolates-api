import { NotFoundException } from '@nestjs/common';

export class ContentNotFoundException extends NotFoundException {
  constructor(page: string) {
    super(`Content for page '${page}' not found`);
  }
}
