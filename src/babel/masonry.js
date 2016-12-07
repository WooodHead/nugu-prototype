'use strict';

const container = document.querySelector( '#cards' );
const msnry = new Masonry( container, {
    itemSelector: '.cd',
    columnWidth: '.grid-size',
    percentWidth: true
});