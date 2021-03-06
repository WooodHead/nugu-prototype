"use strict";

const index      = require('../app/controllers/index');
const service    = require('../app/controllers/service');
const card       = require('../app/controllers/card');
const category   = require('../app/controllers/category');
const management = require('../app/controllers/management');
const ptype      = require( '../app/controllers/ptype' );

module.exports = (app) => {

    // index routes
    app.use(index);

    // management
    app.use( '/management', management );

    // service routes
    app.use( '/service', service );

    // category routes
    app.use( '/category', category );

    // card routes
    app.use( '/card', card );

    // ptype
    app.use( '/ptype', ptype );

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
        message: err.message,
        error: err
        });
    });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};