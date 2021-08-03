module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'valorizeDB',
  synchronize: false,
  logging: false,
  entities: [
    './src/modules/**/infra/typeorm/entities/*.ts'
    // './dist/modules/**/infra/typeorm/entities/*.js'
  ],
  migrations: [
    './src/shared/infra/database/migrations/*.ts'
    // './dist/shared/infra/database/migrations/*.js'
  ],
  cli: {
    migrationsDir: './src/shared/infra/database/migrations'
    // migrationsDir: './dist/shared/infra/database/migrations'
  }
}
