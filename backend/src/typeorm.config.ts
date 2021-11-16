import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'maxxidata',
  password: 'maxxidata',
  database: 'maxxidata',
  entities: [__dirname + '/**/*.model.{js,ts}'],
  synchronize: true,
};
