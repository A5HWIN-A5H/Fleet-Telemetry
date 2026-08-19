require('dotenv').config();
const app = require('./app');
const connectDB = require('./storage/db');

const PORT = process.env.PORT || 3000;

// Initialize Database connection
connectDB();

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = server;