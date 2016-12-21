'use strict';

// Materialize prototype
$( '.snb' ).sideNav();
$( '#apps' ).modal({ opacity: 0.9 });
$( 'ul.tabs' ).tabs( 'select_tab', 'tab_id' );


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
const items = document.querySelectorAll( '.app-item' );


// TL:modal
navTL.add( TweenMax.to( appss, 0.3, { height: '100%', ease: Strong.easeOut }), 'modal' );
// TL:icons
navTL.add( 'icons' );
// each icons tween
items.forEach( ( item, i ) => navTL.add( TweenMax.from( item, 0.33, { x: "-=20", y: "+=20" , opacity: 0 }), `modal+=${0.1 * i}` ) );
// stop and ready
navTL.stop();


if ( !appss.hasClass( 'no-tween' ) ) {
    // media button in apps
    const testItem   = document.querySelector( '#test2' );
    const childList  = document.querySelector( '#test-childs' );
    const childItems = document.querySelectorAll( '.child-item' );
    let child_status = false;
    const childTL    = new TimelineMax({ onComplete: ctlCallback });

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
                TweenMax.set( item, {opacity: '0.3', y: '-=250'} );
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
                TweenMax.set( item, { y: '0'} );
            } else {
                item.classList.remove( 'ai-blur' );
                TweenMax.set( item, { opacity: '1', y: '0' } );
            }
        });
    })

    function unblurItems() {
        child_status = false;
        childTL.reverse();
        appss.off( 'click' );
    }

    // app button in apps
    const testItem2   = document.querySelector( '#app-button' );
    const childList2  = document.querySelector( '#test-childs2' );
    const childItems2 = document.querySelectorAll( '.child-item2' );
    let child_status2 = false;
    const childTL2    = new TimelineMax({ onComplete: ctlCallback2 });

    childTL2.add( TweenMax.from( childList2, 0.3, { height: 0, ease: Strong.easeOut }) );
    childTL2.add( 'childs' );
    childItems2.forEach( ( child, i ) => {
        childTL2.add( TweenMax.from( child, 0.3, { x: "+=20", y: "-=20", opacity: 0 } ), `childs+=${0.1 * i}` );
    })
    childTL2.stop();
    // test item events
    testItem2.addEventListener( 'click', event => {
        blurItems2( event.currentTarget );
    });

    function ctlCallback2() {
        appss.on( 'click', function( event ){
            unblurItems2();
        });
    }

    function blurItems2( current ) {
        // focus & blur
        items.forEach( item =>  {
            if ( item !== current ) {
                item.classList.add( 'ai-blur' )
                TweenMax.set( item, {opacity: '0.3', y: '-=250'} );
            } else {
                item.classList.add( 'ai-focus' )
                TweenMax.set( item, { y: '-=250'} );
            }
        });

        // then
        childTL2.play();
    }

    childTL2.eventCallback( 'onReverseComplete', function() {
        items.forEach( item => {
            if( item == testItem2 ) {
                item.classList.remove( 'ai-focus' );
                TweenMax.set( item, { y: '0'} );
            } else {
                item.classList.remove( 'ai-blur' );
                TweenMax.set( item, { opacity: '1', y: '0' } );
            }
        });
    })

    function unblurItems2() {
        child_status2 = false;
        childTL2.reverse();
        appss.off( 'click' );
    }
}


// open service nav
$( '#open-apps' ).click( event => navTL.play() );
// close service nav
$( '#close-apps' ).click( event=> navTL.reverse() );




/*========================================
=            Card And Service            =
========================================*/


let service_collection  = [];
let cards_collection    = [];
let advanced_collection = [];
let basic_collection    = [];

let offer_collection    = [];
let event_collection    = [];

const container = document.querySelector( '#cards' );
let msnry = {};
if ( container ) {
    msnry = new Masonry( container, {
        itemSelector: '.cd',
        columnWidth: '.grid-size',
        percentWidth: true
    });
}
const cardsList = document.getElementById( 'cards' );

// Card
class Card {
    constructor( command, prop, is_basic ) {
        this.command = command;
        this.prop = prop;
        this.is_basic = is_basic;

        this.elem = document.createElement( 'li' );
        this.elem.classList.add( 'cd' );
        this.elem.classList.add( 't3' );
        this.elem.classList.add( 'is_on' );
        this.elem.classList.add( prop.type );
        
        if ( prop.url ) {
            this.elem.data( 'url', prop.url );
            this.elem.addEventListener( 'click', function( event ){
                location.href = prop.url;
            });
        }

        // context init
        this.setContext();
    }

    checkQuotes( value ) {
        this.command.forEach( ( comm, i ) => {
            let vcom = comm.replace('아리아, ', '');
            if ( value == vcom ) {
                this.command.splice( this.command.indexOf( comm ), 1 );
            }
        });

        this.quotes();
    }

    basicQuote() {
        // console.log( this.command )
        return `<p class="quote">${this.command[0].replace( '아리아, ', '아리아,<br>' )}</p>`;
    }

    quotes() {

        let quotes_len = 3;
        let strs = '';

        if ( !this.is_basic )
            this.command.shuffle( true );

        // this.command.shuffle( true );

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
            <div class="card-wrap card-color">
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


// Skill Cards
class SkillCard extends Card {
    setContext() {
        $( this.elem ).append(`
            <div class="card-wrap card-color">
                <div class="cd-content">
                    <header>
                       <i class="medium material-icons">${this.prop.icon}</i>
                       ${this.basicQuote()}
                    </header>
                    ${this.quotes()}
                </div>
                <footer class="cd-footer clear">
                    <i class="material-icons cd-fr-icon">file_download</i>
                    <a href="/skill" class="fr dis"><b>${this.prop.label}</b> 설치</a>
                </footer>
            </div>`);
    }
}

class EventCard {
    constructor( data ) {
        this.data = data;
        this.elem = create( 'li', '.cd' );
        this.elem.addClass( 't3' );
        this.elem.addClass( 'is_on' );
        this.elem.addClass( 'event' );

        this.setContext();
    }

    setContext() {
        $( this.elem ).append(`
            <div class="card-wrap lighten-2">
                <div class="cd-content">
                    <img src="${this.data.img}">
                </div>
            </div>
            `);
    }
}

// Service
class Service {
    constructor( data ) {
        this.label = data.label;
        this.icon  = data.icon;
        this.color = data.color;

        let card_prop = {
            label: this.label,
            icon: this.icon,
            color: this.color,
            type: 'tutorial',
            url: data.url
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

// Skills
function createSkill( data ) {
    let card_prop = {
        label: data.label,
        icon: data.icon,
        color: data.color,
        status: data.status,
        type: 'skills',
        url: data.url
    };

    offer_collection.push( new SkillCard( data.basic, card_prop, false ) );
}

// Events
function createEvent( data ) {
    event_collection.push( new EventCard( data ) );
}

// set random
function renderRandom() {
    // cards_collection.forEach( card => msnry.remove( card.elem ) );
    // msnry.layout();

    // shuffle collection
    // cards_collection.shuffle(true);

    let offer_index = 0;
    let event_index = 0;

    for ( let [index, card] of cards_collection.entries() ) {
        // 5n skills
        if ( index % 5 == 0 && index ) {
            let offer = offer_collection[offer_index];
            if ( offer ) {
                cardsList.appendChild( offer.elem );
                msnry.appended( offer.elem );
            }
            offer_index++;
        }

        // 7n events
        if ( index % 7 == 0 && index ) {
            let ev = event_collection[event_index];
            if ( event_collection[event_index] ){
                cardsList.appendChild( ev.elem );
                msnry.appended( ev.elem );
            }
            event_index++;
        }

        // 1n service cards
        cardsList.appendChild( card.elem );
        msnry.appended( card.elem )
    }

    event_collection.forEach( event => $(event.elem).find('.card-wrap').css( 'border-top', '5px solid red' ) );
    offer_collection.forEach( event => $(event.elem).find('.card-wrap').css( 'border-top', '5px solid blue' ) );

    msnry.layout();
}

if ( msnry.element ) {
    $.getJSON( '/data/service.json' ).done( data => {
        // for( let [key, val] of Object.entries(data.service) ) {
        for( let key in data.service ) {
            let val = data.service[key];
            switch( key ) {
                case 'skills':
                    val.forEach( skill => createSkill( skill ) );
                    break;
                case 'events':
                    val.forEach( event => createEvent( event ) );
                    break;
                default:
                    new Service( val );
            }
        }

        // renderBasicAndRandom();
        renderRandom();
    });
}

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

// group is on?
let gr_on = false;
let once = false;
let deep = false;
let by = 552;
// window.addEventListener( 'mousewheel', event => {
//     if ( window.scrollY == 0 && event.wheelDelta > 150 ) {
//         testshoot();
//     }
// });

function setStatusItem() {
    let ss = document.querySelectorAll( '.status2' );
    ss.forEach( ( s, i ) => {
        let _top = 39 * i;
        s.addClass( 'minified' );
        s.css( 'position', 'fixed' );
        TweenMax.set( s, { top: _top } );
    });
}

// show status pop
function showStatusPop() {
    once = true;
    let ss = document.querySelectorAll( '.status2' );
    let gr = document.querySelector( '#group' );
    if ( ss.length >= 4 ) {
        groupStatusPop();
    } else {
        $( gr ).hide();
        gr_status = false;
        gr_on = false;
        setStatusItem();
        $( '.status2' ).each( function( i, el ){
            TweenMax.from( el, 0.3, { top: '-=20', opacity: 0, ease: Strong.easeInOut, delay: i * 0.07 });
        });
    }
}

// reverse all status
function reverseAllStatus() {
    if ( gr ) {
        once = false;
        TweenMax.set( gr, { top: '-50' });
        gr_on = false;
        $( '.status2' ).each( function( i, el ){
            let _top = 139 * i;

            el.removeClass( 'minified' );
            el.css({
                'position': 'absolute',
                'top': _top
            });
        });
        msnry.layout();
    }
}

// check status pop position
function checkStatusPopPos() {
    $( '.status2' ).each( function( i, el ){
        let _top = 39 * i;
        if ( gr_on )
            _top = 39 * ( i + 1 );
        TweenMax.to( el, 0.3, { top: _top, ease: Strong.easeOut });
    });
}

// status grouper
let status_icons = [ "local_pizza", "local_taxi", "shopping_basket", "restaurant" ];
// group expand or not
let gr_status = false;
const gr = document.querySelector( '#group' );
const gr_icon = document.querySelector( '#gr-icon' );

/*
gr.addEventListener( 'click', function( event ){
    const group_header = document.querySelector( '#group-header' );
    let ss = document.querySelectorAll( '.status2' );
    if ( !gr_status ) {
        group_header.innerHTML = '현재 사용중인 서비스';
        gr_icon.innerHTML = 'keyboard_arrow_up';
        gr_status = true;
        ss.forEach( ( s, i ) => {
            let _top = 39 * (i + 1);
            if ( gh_status )
                _top += 56;
            s.addClass( 'minified' );
            s.css({
                'position': 'fixed',
                'opacity': .8
            });
            TweenMax.set( s, { top: _top } );
            TweenMax.from( s, 0.3, { top:'-=20', opacity: 0, ease: Strong.easeOut, delay: i * 0.05 });
        });

    } else {
        asyncGroupHeader();
        gr_icon.innerHTML = 'keyboard_arrow_down';
        gr_status = false;
        ss.forEach( ( s, i ) => {
            let _top = 39 * (i + 1);
            TweenMax.to( s, 0.3, { top:'0', opacity: 0, ease: Strong.easeOut, delay: i * 0.06, onComplete: function(){
                TweenMax.set( s, { opacity: .8, top: '-100px' } );
            }});            
        });

    }
});
*/
function hidegrItems(){
    gr_status = false;
    let ss = document.querySelectorAll( '.status2' );
    asyncGroupHeader();
    gr_icon.innerHTML = 'keyboard_arrow_down';
    ss.forEach( ( s, i ) => {
        let _top = 39 * (i + 1);
        TweenMax.set( s, { opacity: .8, top: '-100px' } );
    });
}


function asyncGroupHeader() {
    const group_header = document.querySelector( '#group-header' );
    group_header.innerHTML = '';
    status_icons.forEach( si => {
        $( '#group-header' ).append( `<i class="material-icons service-icon">${si}</i>` );
    });
}

// group status pop
function groupStatusPop() {
    gr_on = true;
    gr.css( 'top', '0' );
    TweenMax.from( gr, 0.3, { top: '-=20', opacity: 0, ease: Strong.easeInOut });
    asyncGroupHeader();
}


// ungroup status pop

$( '.status-close' ).on( 'click', function( event ){
    let id = `${event.currentTarget.data( 'id' )}`;
    let elem = document.getElementById( id );
    let child = $(elem).find( '.card-wrap' );
    let index = $( elem ).index() - 1;

    if ( !once ) {
        TweenMax.to( child, 0.4, { left: '+375px', ease: Strong.easeOut, onComplete: function() {
            elem.remove();
            msnry.layout();
        }});
    } else {
        TweenMax.to( child, 0.4, { left: '+375px', ease: Strong.easeOut, onComplete: function() {
            elem.remove();
            // status_icons.splice(index, 1);
            showStatusPop()
            checkStatusPopPos();
        }});
    }
});

let globalHeader = document.getElementById( 'global-nav' );
const gh_height = 62;
let gh_status = true;

// Global Header Toggle Events
const gh = {
    hide: function() {
        gh_status = false;
        TweenMax.to( globalHeader, 0.55, { opacity: '0', ease: Strong.easeOut, onComplete: function() {
            TweenMax.set( globalHeader, { height: '0px' });
        }});
    },

    show: function() {
        gh_status = true;
        TweenMax.to( globalHeader, 0.33, { opacity: '1', ease: Strong.easeOut, onStart: function() {
            TweenMax.set( globalHeader, { height: '62px' });
        }});
    }
};

function headerToggle( dy ) {
    if ( gh_status && dy > 5 ) {
        gh.hide();
        if ( once && deep ) {
            deep = false;
            if ( gr ) {
                TweenMax.to( gr, 0.3, { top: '-=56', ease: Strong.easeOut } );
                $( '.status2' ).each( function( i, el ){
                    TweenMax.to( el, 0.3, { top: '-=56', ease: Strong.easeInOut, delay: i * 0.07 });
                })
            }
        }        
    }

    if ( !gh_status && dy < 0 ) {
        gh.show();
        if ( once ) {
            deep = true;
            if ( gr ) {
                TweenMax.to( gr, 0.3, { top: '+=56', ease: Strong.easeOut } );
                $( '.status2' ).each( function( i, el ){
                    TweenMax.to( el, 0.3, { top: '+=56', ease: Strong.easeInOut });
                })
            }
        }
    }
}


// scrolling tween
// let safe_gap = 150;
// function scrollTestObject( pageBottom ) {
//     let cards = document.querySelectorAll( '.cd' );
//     cards.forEach( card => {
//         let offsetY = card.offsetTop;

//         if ( offsetY < pageBottom - safe_gap && card.classList.contains( 'is_on' ) )
//             card.removeClass( 'is_on' );
//     });
// }


function scrollEventHandler( deltaY ) {

    if ( !$( '#cards' ).length ) return false;

    let scrollY      = window.scrollY;
    let windowHeight = window.innerHeight;
    let pageBottom   = scrollY + windowHeight;

    if ( gr_status )
        if ( gr )
            hidegrItems();
    if ( window.scrollY < by )
        reverseAllStatus();
    if ( window.scrollY > by && event.deltaY > 0 && !once ) {
        showStatusPop();
    }

    headerToggle( deltaY );

}

window.addEventListener( 'mousewheel', function( event ){
    let deltaY = event.deltaY;
    scrollEventHandler( deltaY );
});

window.addEventListener( 'touchstart', touchStart, false );
window.addEventListener( 'touchmove', touchMove, false );

let start = { x:0, y:0 };

function touchStart( event ){
    start.x = event.touches[0].pageX;
    start.y = event.touches[0].pageY;
}

function touchMove( event ){
    let offset = {};
    offset.x = start.x - event.touches[0].pageX;
    offset.y = start.y - event.touches[0].pageY;
    scrollEventHandler( offset.y );
}

$( '.service-icon' ).click( function( event ){
    gh.show();
    reverseAllStatus();
    TweenMax.to( window, 1, { scrollTo: 0,  ease: Strong.easeOut });
});














