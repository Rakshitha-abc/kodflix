const { Sequelize } = require('sequelize');
require('dotenv').config();

if (!process.env.DB_URL) {
    console.warn('WARNING: DB_URL is not defined in environment variables.');
}

const sequelize = new Sequelize(process.env.DB_URL || 'mysql://localhost/test', {
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }
    }
});

module.exports = sequelize;

