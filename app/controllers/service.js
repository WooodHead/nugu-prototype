'use strict';

const express = require('express');
const mongoose = require('mongoose');
const co = require('co');
const router = express.Router();

// model
const Service = mongoose.model( 'Service' );

// params
router.param( 'sid', co.wrap( function* ( req, res, next, sid ){
    console.log( sid );

    try {
        req.service = yield Service.findById( sid ).populate('childs').exec();
        if ( !req.service ) return next( Error( 'Service not found' ) );
    } catch( err ) {
        return next( err );
    }

    next();
}));

// index
router.get( '/', co.wrap( function* ( req, res ){
    const services = yield Service.find().populate('childs').select();

    res.render( 'service/index', {
        title: 'Service',
        services: services,
        csrf: req.csrfToken()
    });

}));

// view
router.get( '/:sid', co.wrap( function* ( req, res ){

    res.render( 'service/index', {
        title: 'Service',
        service: req.service,
        csrf: req.csrfToken()
    });

}));

// create
router.post( '/', co.wrap( function* ( req, res ){
    
    let service = new Service( req.body );

    try {
        yield service.save();
        req.flash( 'success', 'created' );
        res.redirect( 'back' );
    } catch( err ) {
        req.flash( 'error', 'created faield' );
        console.log( err )()
    }

}));

// delete
router.get( '/delete/:sid', co.wrap( function* ( req, res ) {
    try {
        yield req.service.remove();
        req.flash( 'success', 'deleted' );
        res.redirect( 'back' );
    } catch( err ) {
        req.flash( 'error', 'delete failed' );
        console.log( err );
    }
}) )

module.exports = router;