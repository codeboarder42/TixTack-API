// config/database.config.ts
import { DataSourceOptions } from 'typeorm';

const baseConfig: Partial<DataSourceOptions> = {
  type: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
};

const configs = {
  development: {
    ...baseConfig,
    host: 'localhost',
    port: 5432,
    username: 'dev_user',
    password: 'dev_pass',
    database: 'myapp_dev',
    synchronize: true,
    logging: true,
  },

  test: {
    ...baseConfig,
    host: 'localhost',
    port: 5433,
    username: 'test_user',
    password: 'test_pass',
    database: 'myapp_test',
    synchronize: true,
    dropSchema: true,
  },

  production: {
    ...baseConfig,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    ssl: { rejectUnauthorized: false },
  },
};

export const databaseConfig = configs[process.env.NODE_ENV || 'development'];
