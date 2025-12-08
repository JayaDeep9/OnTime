const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

/* ========================
   ✅ CORS (VERCEL SAFE)
======================== */
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

/* ========================
   ✅ MONGODB CACHED
======================== */
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    }).then((m) => {
      console.log("✅ MongoDB Connected");
      return m;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({
      message: "Database connection failed",
      error: err.message
    });
  }
});

/* ========================
   ✅ ROUTES
======================== */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trains', require('./routes/trains'));
app.use('/api/users', require('./routes/users'));
app.use('/api/live-station', require('./routes/liveStation'));

/* ========================
   ✅ HEALTH CHECK
======================== */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

/* ========================
   ✅ ERROR HANDLER
======================== */
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

/* ✅ VERY IMPORTANT */
module.exports = app;   // ✅ NO app.listen()
