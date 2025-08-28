import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;

    const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_');

    return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()));
  }
}
