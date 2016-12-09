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

// Playbacks
const pb_collapse = document.querySelector( '#pb-collapse' );
const pb = document.querySelector( '#playback' );
// Playback:Mini
const pbm = document.querySelector( '#playback-mini' );

const pbm_open = function() {
    TweenMax.to( pbm, 0.4, { height: '66px', ease: Strong.easeOut } );
}
const pbm_close = function() {
    TweenMax.to( pbm, 0.3, { height: '0px' } );
}
const pb_close = function() {
    TweenMax.to( pb, 0.6, { height: '0%', ease: Strong.easeInOut } );
    TweenMax.to( pbm, 0.3, { height: '66px', delay: 0.6 } )
};
const pb_open = function() {
    TweenMax.to( pb, 0.6, { height: '100%', ease: Strong.easeOut } );
}
pb_collapse.addEventListener( 'click', pb_close );

// service nav
const appss = $( '#apps' );
const navTL = new TimelineMax();
const childTL = new TimelineMax({ onComplete: ctlCallback });
const items = document.querySelectorAll( '.app-item' );
const testItem = document.querySelector( '#test2' );
const childList = document.querySelector( '#test-childs' );
const childItems = document.querySelectorAll( '.child-item' );
let child_status = false;

// TL:modal
navTL.add( TweenMax.to( appss, 0.3, { height: '100%', ease: Strong.easeOut }), 'modal' );
// TL:icons
navTL.add( 'icons' );
// each icons tween
items.forEach( ( item, i ) => navTL.add( TweenMax.from( item, 0.33, { x: "-=20", y: "+=20" , opacity: 0 }), `modal+=${0.1 * i}` ) );
// stop and ready
navTL.stop();

childTL.add( TweenMax.from( childList, 0.3, { height: 0, ease: Strong.easeOut }) );
childTL.add( 'childs' );
childItems.forEach( ( child, i ) => {
    childTL.add( TweenMax.from( child, 0.3, { x: "+=20", y: "-=20", opacity: 0 } ), `childs+=${0.1 * i}` );
})
childTL.stop();
// test item events
testItem.addEventListener( 'click', event => {
    blurItems( event.currentTarget );
});

function ctlCallback() {
    appss.on( 'click', function( event ){
        unblurItems();
    });
}

function blurItems( current ) {
    // focus & blur
    items.forEach( item =>  {
        if ( item !== current ) {
            item.classList.add( 'ai-blur' )
            TweenMax.set( item, {opacity: '0.3'} );
        } else {
            item.classList.add( 'ai-focus' )
        }
    });

    // then
    childTL.play();
}

childTL.eventCallback( 'onReverseComplete', function() {
    items.forEach( item => {
        if( item == testItem ) {
            item.classList.remove( 'ai-focus' );
        } else {
            item.classList.remove( 'ai-blur' );
            TweenMax.set( item, { opacity: '1' } );
        }
    });
})

function unblurItems() {
    child_status = false;
    childTL.reverse();
    appss.off( 'click' );
}


/*========================================
=            Card And Service            =
========================================*/


let service_collection  = [];
let cards_collection    = [];
let advanced_collection = [];
let basic_collection    = []; 

const container = document.querySelector( '#cards' );
const msnry = new Masonry( container, {
    itemSelector: '.cd',
    columnWidth: '.grid-size',
    percentWidth: true
});

const cardsList = document.getElementById( 'cards' );

class Card {
    constructor( command, prop, is_basic ) {
        this.command = command;
        this.prop = prop;
        this.is_basic = is_basic;

        this.elem = document.createElement( 'li' );
        this.elem.classList.add( 'cd' );
        this.elem.classList.add( 'cd-4' );
        this.elem.classList.add( 'tutorial' );

        // context init
        this.setContext();
    }

    setMini() {
        this.elem.classList.add( 'mini' );
    }

    removeMini() {
        this.elem.classList.remove( 'mini' );
    }

    checkQuotes( value ) {
        this.command.forEach( ( comm, i ) => {
            let vcom = comm.replace('아리아, ', '');
            console.log( vcom );
            if ( value == vcom ) {
                this.command.splice( this.command.indexOf( comm ), 1 );
            }
        });

        this.quotes();
    }

    basicQuote() {
        return `<p class="quote">${this.command[0].replace( '아리아, ', '아리아,<br>' )}</p>`;
    }

    quotes() {

        let quotes_len = 3;
        let strs = '';

        if ( !this.is_basic )
            this.command.shuffle( true );


        for ( let i = 1; i < quotes_len; i++ ) {
            if (this.command[i]) {
                let str = this.command[i];
                // if ( i == 0 ) {
                //     strs += `<p class="quote">${str.replace( '아리아, ', '아리아,<br>' )}</p>`;
                // }
                strs += `<p class="quotes">${str}</p>`;
            }
        }

        return strs;
    }

    setContext() {
        $( this.elem ).append(`
            <div class="card-wrap ${this.prop.color} lighten-2">
                <div class="cd-content">
                    <header>
                       <i class="medium material-icons">${this.prop.icon}</i>
                       ${this.basicQuote()}
                    </header>
                    ${this.quotes()}
                </div>
            </div>`);
    }
}

class Service {
    constructor( data ) {

        this.label = data.label;
        this.icon  = data.icon;
        this.color = data.color;

        let card_prop = {
            label: this.label,
            icon: this.icon,
            color: this.color
        };

        // create basic card
        let basic = new Card( data.basic, card_prop, true );
        basic_collection.push( basic );
        cards_collection.push( basic );

        // create advance card
        for( let k in data.commands ) {
            let command = data.commands[k];
            let advanced_card = new Card( command, card_prop, false );
            cards_collection.push( advanced_card );
            advanced_collection.push( advanced_card );
        }
    }
}

// set random
function renderRandom() {
    cards_collection.forEach( card => msnry.remove( card.elem ) );
    msnry.layout();

    cards_collection.shuffle(true);
    cards_collection.forEach( card => {
        cardsList.appendChild( card.elem );
        msnry.appended( card.elem );
    });

    msnry.layout();
}

function renderBasicAndRandom() {
    cards_collection.forEach( card => msnry.remove( card.elem ) );
    msnry.layout();


    basic_collection.shuffle( true );
    advanced_collection.shuffle( true );

    basic_collection.forEach( card => {
        cardsList.appendChild( card.elem );
        msnry.appended( card.elem );
    });

    advanced_collection.forEach( card => {
        cardsList.appendChild( card.elem );
        msnry.appended( card.elem );
    });

    msnry.layout();
}

function setHalf() {
    $( '.cd' ).each( function( i, el ){
        $( el ).removeClass( 'cd-4' ).addClass( 'cd-2' );
    })

    msnry.layout();
}

function setFull() {
    $( '.cd' ).each( function( i, el ){
        $( el ).removeClass( 'cd-2' ).addClass( 'cd-4' );
    })

    msnry.layout();
}

// $.getJSON( 'data/category.json' ).done( data => {
//     console.log( data );
// } );

$.getJSON( 'data/service.json' ).done( data => {
    for( let k in data.service ) {
        new Service( data.service[k] );
    }
});

msnry.layout();

// open service nav
$( '#open-apps' ).click( event => navTL.play() );
// close service nav
$( '#close-apps' ).click( event=> navTL.reverse() );


function setMini(){
    cards_collection.forEach( card => card.setMini() );
    msnry.layout();
}

function removeMini() {
    cards_collection.forEach( card => card.removeMini() );
    msnry.layout();   
}

msnry.layout();

function testStatus( qs ) {
    const $obj = $( qs );
    const $wrap = $obj.find( '.card-wrap' );

    TweenMax.set( $obj, { height: '140px' } );
    msnry.layout();
    TweenMax.to( $wrap, 0.33, { right: 0, ease: Strong.easeOut, delay: .3 } );

    const $close = $obj.find( '.material-icons' );

    $close.click( function() {
        closeStatus( qs );
    });
}

function closeStatus( qs ) {
    const $obj = $( qs );
    const $wrap = $obj.find( '.card-wrap' );
    const $close = $obj.find( '.material-icons' );
    TweenMax.to( $wrap, 0.33, { right: '-315px', ease: Strong.easeIn, onComplete: function() {
        TweenMax.set( $obj, {height: 0 });
        msnry.layout();
    }} );
};

let once = false;
window.addEventListener( 'mousewheel', event => {
    if ( window.scrollY == 0 && event.wheelDelta > 150 ) {
        testshoot();
    }
});

function testshoot(){
    const hsc = $( '#hidden-status-container' );
    hsc.addClass( 'shooted' );
    $( '#main-2' ).css( 'padding-top', '795px' );
    TweenMax.to( hsc, { height: '700', ease: Strong.easeOut });
}



// testStatus( '#status-domino' );
// testStatus( '#status-taxi' );














