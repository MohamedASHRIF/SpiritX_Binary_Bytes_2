const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const { Server } = require("socket.io");
const http = require('http'); // Create an HTTP server

const playerRoutes = require("./routes/playerRoutes");

dotenv.config(); // Loads variables from .env into process.env

const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const app = express();
const server = http.createServer(app); // Create an HTTP server with your Express app

// Initialize Socket.IO with the HTTP server instance
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middleware to parse JSON bodies
app.use(express.json());

// Define CORS options—adjust origin as needed for your front-end URL
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser()); // For parsing cookies

// Apply rate limiter globally
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(limiter);

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Define your routes
app.use('/api/auth', authRoutes);
app.use("/api/players", playerRoutes);

// Placeholder homepage
app.get("/", (req, res) => {
  res.sendStatus(200); // Simply returns a 200 OK status
});

// WebSocket connection setup with Socket.IO
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Make the Socket.IO instance globally accessible if needed
global.io = io;

// Start the HTTP server (not app.listen) to avoid port conflicts
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
