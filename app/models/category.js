'use strict';
const mongoose = require( 'mongoose' );
const Schema   = mongoose.Schema;

const categorySchema = new Schema({
    title: String,
    description: String,
    childs: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    color: String,
    icon: String,
    status: String,
    order: Number
});


mongoose.model( 'Category', categorySchema );