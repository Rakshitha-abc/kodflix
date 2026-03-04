const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Database Sync (Non-blocking)
const initDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');
        await sequelize.sync({ force: false });
        console.log('Database synced.');
    } catch (err) {
        console.error('Database initialization failed:', err.message);
    }
};

initDb();

// Diagnostic Routes
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is responding!', time: new Date().toISOString() });
});

// Health Check
app.get('/api/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ status: 'ok', database: 'connected' });
    } catch (err) {
        res.status(500).json({ status: 'error', database: 'failed', error: err.message });
    }
});

module.exports = app;
