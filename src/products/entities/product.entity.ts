import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Column({ type: 'double precision' })
  price: number;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'varchar' })
  category: string;
  @Column({ type: 'varchar' })
  image: string;
}
