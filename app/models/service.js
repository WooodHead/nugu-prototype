'use strict';
const mongoose = require( 'mongoose' );
const Schema   = mongoose.Schema;

const serviceSchema = new Schema({
    title: String,
    description: String,
    color: String,
    icon: String,
    url: String,
    status: String,
    commands: [ { type: Schema.Types.ObjectId, ref: 'Command' } ]
});

mongoose.model( 'Service', serviceSchema );