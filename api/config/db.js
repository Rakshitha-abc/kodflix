const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
    console.error('CRITICAL: DB_URL is not set in environment variables!');
} else {
    console.log('DB_URL is present. Length:', dbUrl.length);
}

const sequelize = new Sequelize(dbUrl || '', {
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;


