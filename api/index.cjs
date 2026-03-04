const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db.cjs');
const authRoutes = require('./routes/authRoutes.cjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// Root route to check if server is alive
app.get('/api', (req, res) => {
    res.json({ message: 'Kodflix API is running' });
});

// Health Check
app.get('/api/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ status: 'ok', database: 'connected' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Database unreachable', error: err.message });
    }
});

// Server Start (for local development only)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export app for Vercel
module.exports = app;

