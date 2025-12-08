const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// store io instance so routes can access it
app.set("io", io);


// 7. SOCKET.IO EVENTS
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});


// 4. ROUTES (⚠️ must come AFTER app.set("io"))
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trains', require('./routes/trains'));
app.use('/api/users', require('./routes/users'));
app.use('/api/live-station', require('./routes/liveStation'));  // moved up ✔


// 5. HEALTH CHECK
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});


// 8. ERROR HANDLER (ALWAYS LAST)
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});


// 9. START SERVER
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`🚆 Server + Socket.io running on port ${PORT}`);
});
