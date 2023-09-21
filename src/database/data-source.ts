import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions:DataSourceOptions ={
    type:'postgres',
    host:'localhost',
    username:'postgres',
    password:'root',
    database:'nest',
    logging:true,
    synchronize:false,
    entities:['dist/**/*.entity.js'],
    migrations:['dist/database/migrations/*.js'],
    migrationsTableName:'migrations'
};
const dataSource =  new DataSource(dataSourceOptions);
export default dataSource;