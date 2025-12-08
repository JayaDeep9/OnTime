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
   ✅ MONGODB CONNECTION (Serverless Optimized)
================================ */
// Global cache to prevent multiple connections in serverless environment
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable Mongoose buffering
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
};

// Middleware to ensure DB is connected before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database Connection Failed:", error);
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
      hint: "Check MongoDB Network Access (whitelist 0.0.0.0/0)"
    });
  }
});

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
