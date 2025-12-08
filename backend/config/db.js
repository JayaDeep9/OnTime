const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // ✅ Reuse existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // ✅ Create new connection if none exists
  if (!cached.promise) {
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI is not defined");
    }

    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    }).then((mongoose) => {
      console.log("✅ MongoDB Connected");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
