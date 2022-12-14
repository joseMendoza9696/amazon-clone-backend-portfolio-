import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ProductsModule, CustomersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
  // exports: [TypeOrmModule],
})
export class AppModule {}
