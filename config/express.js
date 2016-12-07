"use strict";

const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const cors         = require('cors');
const path         = require('path');
const express      = require('express');
const methodor     = require('method-override');
const flash        = require('flash');
const csrf         = require('csurf');
const session      = require('express-session');

module.exports = (app) => {
    app.set('views', path.join(__dirname, '../app/views'));
    app.set('view engine', 'jade');

    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(cors());

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(methodor( req => {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));
    app.use(cookieParser());
    app.use(csrf({ cookie: true }));
    app.use(express.static(path.join(__dirname, '../app/assets')));
    app.use(express.static(path.join(__dirname, '../lib')));
    app.use(session({
        secret: 'A4BviaA4BANANA',
        resave: false,
        saveUninitialized: false
    }));
    app.use(flash());
};