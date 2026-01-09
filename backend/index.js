require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();


connectDB()
  .then(() => console.log("✅ Initial MongoDB connection successful"))
  .catch(err => console.error("❌ Initial MongoDB connection FAILED:", err.message));


const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000'
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ Database Middleware Failure:", err.message);
    return res.status(500).json({
      message: "Database connection failed",
      error: err.message
    });
  }
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/trains', require('./routes/trains'));
app.use('/api/users', require('./routes/users'));
app.use('/api/live-station', require('./routes/liveStation'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is healthy' });
});

app.use((err, req, res, next) => {
  console.error("❌ GLOBAL ERROR:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚆 Server running on port ${PORT}`);
  });
}

module.exports = app;
