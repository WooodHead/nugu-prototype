'use strict';
const mongoose = require( 'mongoose' );
const Schema   = mongoose.Schema;

const serviceSchema = new Schema({
    title: String,
    description: String,
    childs: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
    color: String,
    icon: String
});

mongoose.model( 'Service', serviceSchema );