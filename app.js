'use strict';

const express      = require('express');
const path         = require('path');
const app = express();

require('./config/express')(app);
require('./config/routes')(app);

module.exports = app;