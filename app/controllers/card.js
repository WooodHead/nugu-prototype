'use strict';

const express = require('express');
const mongoose = require('mongoose');
const co = require('co');
const router = express.Router();

// model
const Service = mongoose.model( 'Service' );
const Card = mongoose.model( 'Card' );

// params
router.param( 'cid', co.wrap( function* ( req, res, next, sid ){

    try {
        req.card = yield Card.findById( cid ).populate('service').exec();
        if ( !req.card ) return next( Error( 'Card not found' ) );
    } catch( err ) {
        return next( err );
    }

    next();
}));

// index
router.get( '/', co.wrap( function* ( req, res ){
    const services = yield Service.find().exec();
    const cards = yield Card.find().populate('service').select();

    res.render( 'card', {
        title: 'Cards',
        cards: cards,
        services: services,
        csrf: req.csrfToken()
    });

}));

// create
router.post( '/', co.wrap( function* ( req, res ){
    
    let card = new Card( req.body );

    try {
        yield card.save();
        req.flash( 'success', 'created' );
        res.redirect( 'back' );
    } catch( err ) {
        req.flash( 'error', 'created faield' );
        console.log( err )()
    }

}));

module.exports = router;