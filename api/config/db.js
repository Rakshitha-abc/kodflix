const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
    console.error('CRITICAL: DB_URL is missing!');
}

/* 
  AIVEN SSL CONFIG: 
  Free-tier Aiven databases REQUIRE SSL. 
  Vercel environments need this configured explicitly in Sequelize.
*/
const sequelize = new Sequelize(dbUrl, {
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 3,
        min: 0,
        acquire: 60000,
        idle: 10000
    }
});

module.exports = sequelize;
