const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const route = require('./router');
const multer = require('./multer/multer')

require('dotenv').config();


const app = express();
const connectDB = require('./config/db');

const route = require('./router');

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend local URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'] 
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/",(req, res) => {
  res.send("<h2>Logistics app by MFT.<h2>")
})

app.use("/logistics",route);

connectDB();

//Route
app.use('/logistics',route);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


