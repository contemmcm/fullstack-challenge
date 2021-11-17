import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'maxxidata',
  username: process.env.DB_USER || 'maxxidata',
  password: process.env.DB_PASS || 'maxxidata',
  entities: [__dirname + '/**/*.model.{js,ts}'],
  synchronize: true,
};
