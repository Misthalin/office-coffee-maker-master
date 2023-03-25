// Everything related to accounts is inspired/taken from https://github.com/cornflourblue/node-mongo-signup-verification-api / https://jasonwatmore.com/post/2020/05/13/node-mongo-api-with-email-sign-up-verification-authentication-forgot-password
require('rootpath')();
require('dotenv').config();
const express = require('express');
const errorHandler = require('./_middleware/errorHandler');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

app.use('/accounts', require('./controllers/usersController'));
app.use('/api/beans', require('./routes/beanRoutes'));
app.use('/api/brews', require('./routes/brewRoutes'));
app.use('/api/votes', require('./routes/voteRoutes'));
app.use('/api-docs', require('_helpers/swagger'));

app.use(errorHandler);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
