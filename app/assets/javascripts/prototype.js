'use strict';

// Materialize prototype
$( '.snb' ).sideNav();
$( '#apps' ).modal({
    opacity: 0.9
});

// temp events
function domino() {
    $( '#domino' ).slideDown( 333 );
}

// close domino events
$( '#domino' ).on( 'click', ( event ) => {
    $( event.currentTarget ).slideUp( 300 );
});


// open apps
$( '#open-apps' ).click( event => {
    tl.play();
});

// close apps
$( '#close-apps' ).click( event=> {
    tl.reverse();
});

const apps = $( '#apps' );
const tl = new TimelineMax();
tl.add( TweenMax.to( apps, 0.3, { height: '100%', ease: Strong.easeOut }), 'modal' );
tl.add( 'icons' );
$( '.app-item' ).each( ( i, item ) => {
    tl.add( TweenMax.from( item, 0.33, { x: "-=20", y: "+=20" , opacity: 0 }), `modal+=${0.1 * i}` );
});
tl.stop();