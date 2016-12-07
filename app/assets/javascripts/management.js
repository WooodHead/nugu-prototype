'use_strict';


// material selectbox
$( 'select' ).material_select();

// material chips
$( '.chips-placeholder' ).material_chip({
    secondaryPlaceholder: '+ 발화문( 예제 )'
});

// chips
let chip_collection = {};

class QuoteInput {
    constructor( tag ) {

        this.parent = document.getElementById( 'card-form' );
        this.elem = document.createElement( 'input' );
        this.elem.setAttribute( 'type', 'hidden' );
        this.elem.name = 'quotes[]'
        this.elem.value = tag;
    }

    append() {
        this.parent.appendChild( this.elem );
    }

    remove() {
        this.elem.remove();
    }
}

// chips.add events
$( '.chips' ).on( 'chip.add', ( event, chip ) => {
    
    let tag = chip.tag;
    let quote = new QuoteInput( tag );
    chip_collection[tag] = quote;

    quote.append();
});

$( '.chips' ).on( 'chip.delete', ( event, chip ) => {

    let tag = chip.tag;
    if ( chip_collection[tag] )
        chip_collection[tag].remove();
});




















