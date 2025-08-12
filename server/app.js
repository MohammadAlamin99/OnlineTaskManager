//  basic import
const express = require("express");
const app = express();
const router = require("./src/routes/api");
const bodyParser = require('body-parser');
require('dotenv').config()
// security middleware import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Database Lib Import
const mongoose = require('mongoose');

//  database connecting (mongodb)
let URL = process.env.MONGODB_URL;
let option = { user: process.env.DB_USER, pass: process.env.DB_PASSWORD, autoIndex: true }
mongoose.connect(URL, option).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log(err)
})

//  seccurity middleware implemantation
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
// Body Parser Implement
app.use(bodyParser.json())

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(limiter)


// Routing Implement
app.use("/api/v1", router)


// Undefined Route Implement
app.use("*", (req, res) => {
    res.status(404).json({ status: "fail", data: "Not Found" })
})

module.exports = app;