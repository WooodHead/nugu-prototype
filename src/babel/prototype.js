'use strict';

// lib
function* entries(obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

// Materialize prototype
$( '.snb' ).sideNav();

// temp events
function domino() {
    $( '#domino' ).slideDown( 333 );
}

$( '#domino' ).on( 'click', ( event ) => {
    $( event.currentTarget ).slideUp( 300 );
});


// Item Class

class Item {
    constructor( data ) {
        console.log( data );
        this.elem = document.createElement( 'li' );
    }
}


$.getJSON( 'data/data.json', results => {
    for ( let [key, val] of entries(results) ) {
        console.log( key );
    }
});