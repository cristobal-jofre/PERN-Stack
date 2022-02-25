require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const taskRoutes = require('./routes/tasks.routes');

const app = express(); 

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // With this the server is available to read json info 

// Routes
app.use(taskRoutes);

app.listen(4000);
console.log("Server on port 4000");