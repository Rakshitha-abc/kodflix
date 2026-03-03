const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Database Sync
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced successfully');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

// Server Start (for local development only)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export app for Vercel
module.exports = app;

