'use strict';

const express = require('express');
const mongoose = require('mongoose');
const co = require('co');
const router = express.Router();

// models
const Commands = mongoose.model( 'Command' );
const Service  = mongoose.model( 'Service' );
const Category = mongoose.model( 'Category' );

// get categories
router.use( co.wrap( function* ( req, res, next ){
    try {
        req.categories = yield Category.find();
        next();
    } catch( err ) {
        console.log( err );
    }
}));


// get services
router.use( co.wrap( function* ( req, res, next ){
    try {
        req.services = yield Service.find();
        next();
    } catch( err ) {
        console.log( err );
    }
}));

// management
router.get( '/', co.wrap( function* ( req, res ){
    // render
    res.render( 'management/index', {
        title: 'NUGU & PXD',
        categories: req.categories,
        services: req.services,
        csrf: req.csrfToken(),
        root: true
    });

}));



// exports
module.exports = router;