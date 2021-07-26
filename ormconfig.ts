export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'valorizeDB',
  synchronize: false,
  logging: false,
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/database/migrations'
  }
}
