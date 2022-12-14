import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          synchronize: true,
          entities: [Product],
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
  // exports: [],
})
export class DatabaseModule {}
