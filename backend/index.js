const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.MONGODB_URI) {
  console.error("❌ FATAL: MONGODB_URI is not defined.");
}
if (!process.env.JWT_SECRET) {
  console.error("❌ FATAL: JWT_SECRET is not defined.");
}

const app = express();

/* ===============================
   ✅ CORS CONFIG
================================ */
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (!allowedOrigins.includes(origin)) {
      return callback(
        new Error('The CORS policy for this site does not allow access from the specified Origin.'),
        false
      );
    }

    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

/* ===============================
   ✅ BODY PARSING
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===============================
   ✅ MONGODB CONNECTION
================================ */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

/* ===============================
   ✅ ROUTES
================================ */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trains', require('./routes/trains'));
app.use('/api/users', require('./routes/users'));
app.use('/api/live-station', require('./routes/liveStation'));

/* ===============================
   ✅ HEALTH CHECK
================================ */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

/* ===============================
   ✅ GLOBAL ERROR HANDLER
   (ALWAYS LAST)
================================ */
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

/* ===============================
   ✅ START SERVER
================================ */
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚆 Server running on port ${PORT}`);
  });
}

module.exports = app;
