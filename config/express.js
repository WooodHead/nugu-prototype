"use strict";

const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const cors         = require('cors');
const path         = require('path');
const express      = require('express');

module.exports = (app) => {
    app.set('views', path.join(__dirname, '../app/views'));
    app.set('view engine', 'jade');

    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(cors());

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../app/assets')));
    app.use(express.static(path.join(__dirname, '../lib')));

};