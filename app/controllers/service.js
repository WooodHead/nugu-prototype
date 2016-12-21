'use strict';

const express = require('express');
const mongoose = require('mongoose');
const co = require('co');
const router = express.Router();

// model
const Service = mongoose.model( 'Service' );
const Category = mongoose.model( 'Category' );

// params
router.param( 'sid', co.wrap( function* ( req, res, next, sid ){
    try {
        req.service = yield Service.findById( sid ).exec();
        if ( !req.service ) return next( Error( 'Service not found' ) );
    } catch( err ) {
        return next( err );
    }

    next();
}));

// index
router.get( '/', co.wrap( function* ( req, res ){
    const services = yield Service.find().exec();
    const categories = yield Category.find().exec();

    res.render( 'service/index', {
        title: 'Service',
        services: services,
        categories: categories,
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
    let category = yield Category.findById( req.body.category );
    let service = new Service( req.body );

    // push to category
    category.childs.push( service );

    try {
        yield [ service.save(), category.save() ];
        req.flash( 'success', 'created' );
        res.redirect( 'back' );
    } catch( err ) {
        console.log( err );
    }

}));

// update
router.get( '/update/:sid', co.wrap( function* ( req, res ) {

    let category = yield Category.findById( req.service.category );

    // push
    category.childs.push( req.service );


    try {
        yield category.save();
        req.flash( 'success', 'updated!' );
        res.redirect( 'back' );
    } catch( e ) {
        console.log( e );
    }

}));

// delete
router.get( '/delete/:sid', co.wrap( function* ( req, res ) {
    // get category
    let category = yield Category.findById( req.service.category ).exec();

    // pull this service
    category.childs.pull( req.service._id );

    try {
        yield [ category.save(), req.service.remove() ];
        req.flash( 'success', 'deleted' );
        res.redirect( 'back' );
    } catch( err ) {
        req.flash( 'error', 'delete failed' );
        console.log( err );
    }
}) )

module.exports = router;