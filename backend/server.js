require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const { Server } = require("socket.io");

const http = require('http'); // Add this line


const playerRoutes = require("./routes/playerRoutes");
// const authRoutes = require("./routes/authRoutes");

dotenv.config();
const cookieParser = require('cookie-parser'); // Don't forget to import cookie-parser
const rateLimit = require('express-rate-limit'); // To add rate limiting


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
app.use(express.json()); // This is needed to parse JSON body
// Define the CORS options
const corsOptions = {
  origin: 'http://localhost:3000',  // Frontend URL (React app running on localhost:3000)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
  credentials: true,  // Allow credentials such as cookies
};

// Middleware
app.use(cors(corsOptions));  // Apply the CORS middleware with specific options

app.use(express.json());
app.use(cookieParser()); // For parsing cookies

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(limiter); // Apply rate limiter globally


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);

app.use("/api/players", playerRoutes);

// Homepage route (or a placeholder for future work)
app.get("/", (req, res) => {
  res.sendStatus(200);  // A simple 200 OK response without content
});



// WebSocket connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

global.io = io; // Making WebSocket globally accessible


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
