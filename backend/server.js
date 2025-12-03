// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();


// ================================
// 1. CORS MIDDLEWARE (ONLY ONCE)
// ================================
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));


// ================================
// 2. BODY PARSERS
// ================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ================================
// 3. DATABASE CONNECTION
// ================================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));


// ================================
// 4. ROUTES
// ================================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trains', require('./routes/trains'));
app.use('/api/users', require('./routes/users'));


// ================================
// 5. HEALTH CHECK
// ================================
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});


// ================================
// 6. CREATE HTTP SERVER FOR SOCKET.IO
// ================================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Store io so routes can use it
app.set("io", io);


// ================================
// 7. SOCKET.IO EVENTS
// ================================
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});


// ================================
// 8. ERROR HANDLER (MUST BE LAST)
// ================================
app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});


// ================================
// 9. START SERVER
// ================================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚆 Server + Socket.io running on port ${PORT}`);
});
