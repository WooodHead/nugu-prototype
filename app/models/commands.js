'use strict';
const mongoose = require( 'mongoose' );
const Schema   = mongoose.Schema;

const commandSchema = new Schema({
    service: {
        label: String,
        model: { type: Schema.Types.ObjectId, ref: 'Service' }
    },
    is_basic: Boolean,
    type: String,
    string: String
});

mongoose.model( 'Command', commandSchema );