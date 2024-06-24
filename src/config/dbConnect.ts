import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
} = process.env;

const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD! as string, {
    host: DB_HOST!,
    port: parseInt(DB_PORT!),
    dialect: 'postgres',
});

export default sequelize;