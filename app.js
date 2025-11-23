
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(helmet()); 
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 
});
app.use(limiter);


app.use('/api/auth', require('./auth'));
