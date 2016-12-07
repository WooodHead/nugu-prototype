'use strict';
const mongoose = require( 'mongoose' );
const Schema   = mongoose.Schema;

const cardSchema = new Schema({
    type: String,
    title: String,
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    is_show: { type: Boolean, default: true },
    vcommand: String,
    description: String,
    quotes: Array,
    descOrder: { type: Boolean, default: true },
    actions: Array,
    icon: String,
    color: String,
    status: String,
    note: String
});

mongoose.model( 'Card', cardSchema );