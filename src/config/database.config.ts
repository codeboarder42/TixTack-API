// config/database.config.ts
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

const baseConfig: Partial<DataSourceOptions> = {
  type: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
};

export const getDatabaseConfig = (
  configService: ConfigService,
): DataSourceOptions => {
  const environment = configService.get('NODE_ENV', 'development');
  const configs = {
    development: {
      ...baseConfig,
      host: configService.getOrThrow<string>('DATABASE_HOST'),
      port: configService.getOrThrow<number>('DATABASE_PORT'),
      username: configService.getOrThrow<string>('DATABASE_USERNAME'),
      password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
      database: configService.getOrThrow<string>('DATABASE_NAME'),
      synchronize: configService.getOrThrow<boolean>('DATABASE_SYNC'),
      logging: true,
    },

    // fake
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
      host: configService.getOrThrow<string>('DATABASE_HOST'),
      port: configService.getOrThrow<number>('DATABASE_PORT'),
      username: configService.getOrThrow<string>('DATABASE_USERNAME'),
      password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
      database: configService.getOrThrow<string>('DATABASE_NAME'),
      synchronize: configService.getOrThrow<boolean>('DATABASE_SYNC'),
      logging: false,
      ssl: { rejectUnauthorized: false },
    },
  };

  return configs[environment] as DataSourceOptions;
};
