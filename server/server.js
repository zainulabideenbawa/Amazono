
const express = require('express');
const morgan = require('morgan');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config')
const cors = require('cors')


const app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(cors())

mongoose.connect(config.database,  err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to the database');
    }
  });
  

const userRoutes = require('./routes/account');
const mainRoutes = require('./routes/main');

app.use('/api', mainRoutes)

app.use('/api/accounts', userRoutes);

app.listen(config.port, err => {
    console.log('server is running on port '+config.port)
});