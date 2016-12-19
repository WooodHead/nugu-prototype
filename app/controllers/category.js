'use strict';

const express = require('express');
const mongoose = require('mongoose');
const co = require('co');
const router = express.Router();

// model
const Category = mongoose.model( 'Category' );

// params
router.param( 'cid', co.wrap( function* ( req, res, next, sid ){

    try {
        req.category = yield Category.findById( cid ).populate('childs').exec();
        if ( !req.service ) return next( Error( 'Service not found' ) );
    } catch( err ) {
        return next( err );
    }

    next();
}));

// index
router.get( '/', co.wrap( function* ( req, res ){
    const categories = yield Category.find().populate('childs').select();

    res.render( 'category/index', {
        title: 'Category',
        categories: categories,
        csrf: req.csrfToken()
    });

}));

// create
router.post( '/', co.wrap( function* ( req, res ){
    
    let category = new Category( req.body );

    try {
        yield category.save();
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
        yield req.category.remove();
        req.flash( 'success', 'deleted' );
        res.redirect( 'back' );
    } catch( err ) {
        req.flash( 'error', 'delete failed' );
        console.log( err );
    }
}) )

module.exports = router;