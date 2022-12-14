import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from '../../dto/products.dto';
import { Repository } from 'typeorm';

import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find({
      take: 20,
      order: {
        title: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    return await this.productRepo.save(newProduct);
  }

  async createMany(data: any) {
    for await (const product of data) {
      const newProduct = this.productRepo.create({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
      });

      await this.productRepo.save(newProduct);
    }

    return 'saved';
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne({ where: { id: id } });
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    return this.productRepo.delete(id);
  }
}
