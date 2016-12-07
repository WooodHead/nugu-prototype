'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const model_path = path.join( __dirname, '../app/models' );

module.exports = function (){
    
    // Promise
    mongoose.Promise = global.Promise;

    // connect
    mongoose.connect( 'mongodb://localhost' );

    // read models
    fs.readdirSync(model_path)
        .filter( file => ~file.search(/^[^\.].*\.js$/) )
        .forEach( file => require(path.join(model_path, file)) );

};