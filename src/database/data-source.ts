import { DataSource, DataSourceOptions } from "typeorm";
require('dotenv').config();

export const dataSourceOptions: DataSourceOptions = {
    type: process.env.DATABASE_TYPE as any,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: process.env.DATABASE_LOGGING === 'true' || false,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' || false,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    migrationsTableName: 'migrations',
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;