import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const databaseName = process.env.DB_NAME;
const databaseUsername = process.env.DB_USER;
const databasePassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(databaseName, databaseUsername, databasePassword, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
});

export const connectMySQL = async () => {
    try {
        await sequelize.authenticate(); 
        console.log('Connected to MySQL');

        await sequelize.sync({ alter: true });
        console.log('Database synchronized');
        
    } catch (error) {
        console.error('Error connecting to MySQL or synchronizing database:', error.message);
        process.exit(1);
    }
};

export default sequelize;
