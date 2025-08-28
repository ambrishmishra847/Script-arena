require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const connectDB = require('./config/db');
const cors = require('cors');

// Connect to Database
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/problems', require('./routes/problems'));
app.use('/api/submissions', require('./routes/submissions'));
app.use('/api/ai', require('./routes/ai'));

// Global error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('joinContest', (contestId) => {
    socket.join(contestId);
    console.log(`User ${socket.id} joined contest ${contestId}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Make io accessible to our controllers
app.set('socketio', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
