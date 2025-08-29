
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const helmet = require('helmet')

const authRouter = require('./routes/authRouter')
const postsRouter = require('./routes/postsRouter')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(helmet());



// Routes


// app.use('/api/example', require('./routes/exampleRoute'));
app.use('/api/auth',authRouter)
app.use('/api/posts',postsRouter)

app.get('/', (req, res) => {
  res.json({message:'💼 Murphy Backend is Live'});
});


module.exports = app;
