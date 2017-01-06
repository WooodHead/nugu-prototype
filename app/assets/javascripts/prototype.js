'use strict';

// Materialize prototype
$( '#gh-left' ).sideNav();

let cg = 'melon';

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

$( '#pbm-cover' ).click( function(){
    TweenMax.to( $('#current-playlist'), 0.33, { height: '98%', ease: Strong.easeOut } );
});

$( '#shit' ).click( function(){
    TweenMax.to( $('#current-playlist'), 0.33, { height: '0', ease: Strong.easeOut } );
})


// service nav

/*
const appss      = $( '#apps' );
const navTL      = new TimelineMax();
const childTL    = new TimelineMax({ onComplete: ctlCallback });
const items      = document.querySelectorAll( '.app-item' );
const testItem   = document.querySelector( '#test2' );
const childList  = document.querySelector( '#test-childs' );
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

// open service nav
$( '#open-apps' ).click( event => navTL.play() );
// close service nav
$( '#close-apps' ).click( event=> navTL.reverse() );
*/

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
// const msnry = new Masonry( container, {
//     itemSelector: '.cd',
//     columnWidth: '.grid-size',
//     percentWidth: true
// });
const cardsList = document.getElementById( 'cards' );

const cont = document.querySelector( '#cards' );
const masonry = new A4BMasonry( cont, { selector: '.cd', size: .5, sizer: '.masonry-size', lazy: true } );
masonry.init();

// window resize event ( via A4B Window Resize By Delay )
const windowResizeEvent = new WindowResizeEventByDelay(function() { masonry.init() });


// Card
class Card {
    constructor( command, prop, is_basic ) {
        this.command = command;
        this.prop = prop;
        this.is_basic = is_basic;
        this.elem = document.createElement( 'li' );
        this.elem.classList.add( 'cd' );
        this.elem.classList.add( 'cd-column' );
        this.elem.classList.add( prop.type );


        if ( this.is_basic )
            this.elem.classList.add( 'basic' );

        // context initv
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
        if ( !this.is_basic ) {
            $( this.elem ).append(`
                <div class="card-wrap card-color">
                        <div class="cd-content">
                            <header>
                               <i class="medium material-icons">${this.prop.icon}</i>
                               <h2 class="cd-label">${this.prop.label}</h2>
                               ${this.basicQuote()}
                            </header>
                            ${this.quotes()}
                        </div>
                </div>`);
        } else {
            $( this.elem ).append(`
                <div class="card-wrap card-color" style="background-color:${this.prop.color}">
                    <a href="javascript:void(0)" data-nc="${this.prop.url}" data-label="${this.prop.label}" class="nc" >
                        <div class="cd-content">
                            <header>
                               <i class="medium material-icons">${this.prop.icon}</i>
                               <h2 class="cd-label">${this.prop.label}</h2>
                               ${this.basicQuote()}
                            </header>
                            ${this.quotes()}
                        </div>
                    </a>
                </div>`);
        }
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

        let is_basic = true;
        // create basic card
        if ( this.label == '타이머' || this.label == '수면예약' || this.label == '날짜/시간' || this.label == '폰찾기' )
            is_basic = false;

        let basic = new Card( data.basic, card_prop, is_basic );
        basic_collection.push( basic );
        // cards_collection.push( basic );

        // create advance card
        for( let k in data.commands ) {
            let command = data.commands[k];
            let advanced_card = new Card( command, card_prop, false );
            // cards_collection.push( advanced_card );
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
    cards_collection.shuffle(true);

    let offer_index = 0;
    let event_index = 0;

    for ( let [index, card] of cards_collection.entries() ) {
        // 5n skills
        if ( index % 5 == 0 && index ) {
            let offer = offer_collection[offer_index];
            if ( offer ) {
                cardsList.appendChild( offer.elem );
                masonry.add( offer.elem );
                // msnry.appended( offer.elem );
            }
            offer_index++;
        }

        // 7n events
        if ( index % 7 == 0 && index ) {
            let ev = event_collection[event_index];
            if ( event_collection[event_index] ){
                cardsList.appendChild( ev.elem );
                masonry.add( ev.elem );
                // msnry.appended( ev.elem );
            }
            event_index++;
        }

        // 1n service cards
        cardsList.appendChild( card.elem );
        masonry.add( card.elem );
        // msnry.appended( card.elem )
    }

    // msnry.layout();

    // event_collection.forEach( event => $(event.elem).find('.card-wrap').css( 'border-top', '5px solid red' ) );
    // offer_collection.forEach( event => $(event.elem).find('.card-wrap').css( 'border-top', '5px solid blue' ) );

    // masonry.init();
}

function renderBasicAndRandom() {

    // basic_collection.shuffle( true );
    advanced_collection.shuffle( true );

    basic_collection.forEach( card => {
        cardsList.appendChild( card.elem );
        masonry.add( card.elem );
    });

    advanced_collection.forEach( card => {
        cardsList.appendChild( card.elem );
        masonry.add( card.elem );
    });
}

// $.getJSON( 'data/category.json' ).done( data => {
//     console.log( data );
// } );

// msnry.layout();

function testStatus( qs ) {
    const $obj = $( qs );
    const $wrap = $obj.find( '.card-wrap' );

    TweenMax.set( $obj, { height: '140px' } );
    // msnry.layout();
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

// gr.addEventListener( 'click', function( event ){
//     const group_header = document.querySelector( '#group-header' );
//     let ss = document.querySelectorAll( '.status2' );
//     if ( !gr_status ) {
//         group_header.innerHTML = '현재 사용중인 서비스';
//         gr_icon.innerHTML = 'keyboard_arrow_up';
//         gr_status = true;
//         ss.forEach( ( s, i ) => {
//             let _top = 39 * (i + 1);
//             if ( gh_status )
//                 _top += 56;
//             s.addClass( 'minified' );
//             s.css({
//                 'position': 'fixed',
//                 'opacity': .8
//             });
//             TweenMax.set( s, { top: _top } );
//             TweenMax.from( s, 0.3, { top:'-=20', opacity: 0, ease: Strong.easeOut, delay: i * 0.05 });
//         });

//     } else {
//         asyncGroupHeader();
//         gr_icon.innerHTML = 'keyboard_arrow_down';
//         gr_status = false;
//         ss.forEach( ( s, i ) => {
//             let _top = 39 * (i + 1);
//             TweenMax.to( s, 0.3, { top:'0', opacity: 0, ease: Strong.easeOut, delay: i * 0.06, onComplete: function(){
//                 TweenMax.set( s, { opacity: .8, top: '-100px' } );
//             }});            
//         });

//     }
// });

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
    if ( gh_status && dy > 0 ) {
        gh.hide();
        if ( once && deep ) {
            deep = false;
            TweenMax.to( gr, 0.3, { top: '-=56', ease: Strong.easeOut } );
            $( '.status2' ).each( function( i, el ){
                TweenMax.to( el, 0.3, { top: '-=56', ease: Strong.easeInOut, delay: i * 0.07 });
            })
        }        
    }

    if ( !gh_status && dy < 0 ) {
        gh.show();
        if ( once ) {
            deep = true;
            TweenMax.to( gr, 0.3, { top: '+=56', ease: Strong.easeOut } );
            $( '.status2' ).each( function( i, el ){
                TweenMax.to( el, 0.3, { top: '+=56', ease: Strong.easeInOut });
            })
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

    let scrollY      = window.scrollY;
    let windowHeight = window.innerHeight;
    let pageBottom   = scrollY + windowHeight;

    if ( gr_status )
        hidegrItems();
    if ( window.scrollY < by )
        reverseAllStatus();
    if ( window.scrollY > by && event.deltaY > 0 && !once ) {
        showStatusPop();
    }

    headerToggle( deltaY );
    // scrollTestObject( pageBottom );

}

// window.addEventListener( 'mousewheel', function( event ){
//     let deltaY = event.deltaY;
//     scrollEventHandler( deltaY );
// });

// window.addEventListener( 'touchstart', touchStart, false );
// window.addEventListener( 'touchmove', touchMove, false );

// let start = { x:0, y:0 };

// function touchStart( event ){
//     start.x = event.touches[0].pageX;
//     start.y = event.touches[0].pageY;
// }

// function touchMove( event ){
//     let offset = {};
//     offset.x = start.x - event.touches[0].pageX;
//     offset.y = start.y - event.touches[0].pageY;
//     scrollEventHandler( offset.y );
// }

$( '.service-icon' ).click( function( event ){
    gh.show();
    reverseAllStatus();
    TweenMax.to( window, 1, { scrollTo: 0,  ease: Strong.easeOut });
});



const appIcon = {
    view_type: 'column',
    width: '50%',

    toggleView() {

        let container = document.querySelector( '#cards' );
        let items = document.querySelectorAll( '.cd' );
        let sizer = document.querySelector( '.masonry-size' );

        switch( this.view_type ) {
            case 'row':
                this.view_type = 'column';
                sizer.css( 'width', '100%' );
                container.removeClass( 'column-list' );
                globalHeader2.setRight( 'column_view' );
                break;

            case 'column':
                this.view_type = 'row';
                sizer.css( 'width', '33.3333%' );
                container.addClass( 'column-list' );
                globalHeader2.setRight( 'card_view' );
                break;
        }

        setTimeout( function() {
            masonry.init();
        }, 330 );
    }
}

document.getElementById( 'open-apps' ).addEventListener( 'click', ( event )=> {
    appIcon.toggleView();
}, false);


// NUGU Guide
const userGuide = {
    status: 'collapse',
    current: $( '#gc-music' ),
    child: '',

    collapse() {
        this.current.find( 'i' ).html( 'keyboard_arrow_down' );
        this.status = 'collapse';

        this.child = $(`#${this.current.data( 'child' )}`);
        // TweenMax.to( this.child, .33, { height: '0', ease: Strong.easeOut });
        this.child.slideUp( 333 );
    },

    expand() {
        this.current.find( 'i' ).html( 'keyboard_arrow_up' );
        this.status = 'expand';
    
        this.child = $(`#${this.current.data( 'child' )}`);

        // TweenMax.to( this.child, .33, { height: '100%', ease: Strong.easeOut });
        this.child.slideDown( 333 );
    },

    toggle() {
        // to expand
        if ( this.status == 'collapse' ) return this.expand();

        // to collapse
        if ( this.status == 'expand' ) return this.collapse();
    }
}

const globalHeader2 = {
    elem: document.querySelector( '#global-nav' ),
    logo: document.querySelector( '#logo' ),
    left: document.querySelector( '#gh-left' ),
    right: document.querySelector( '#open-apps' ),
    left_icon: document.querySelector( '#gh-left-icon' ),
    right_icon: document.querySelector( '#gh-right-icon' ),

    action ( to ){
        console.log( to );
    },

    setLogo( string ) {
        let pageTitle = string ? string : 'NUGU';
        this.logo.innerHTML = pageTitle;
    },

    setLeft( status ) {

        $( '.gh-lefts' ).hide();

        switch( status ) {
            case 'back':
                $( '#gh-back' ).css( 'display', 'block' );
                break;
            case 'menu':
                $( '#gh-left' ).css( 'display', 'block' );
                break;
            case 'none':
                this.left_icon.innerHTML = '';
                break;
            default:
                this.left_icon.innerHTML = status;
                break;
        }

    },

    setRight( status ) {

        $( '.gh-rights' ).hide();

        switch( status ) {
            case 'close':
                $( '#gh-right-close' ).css( 'display', 'block' );
                break;
            case 'chat':
                $( '#gh-right-chat' ).css( 'display', 'block' );
                break;
            case 'column_view':
                $( '#open-apps' ).css( 'display', 'block' );
                this.right_icon.innerHTML = 'apps';
                break;
            case 'card_view':
                $( '#open-apps' ).css( 'display', 'block' );
                this.right_icon.innerHTML = 'view_agenda';
                break;
            default:
                this.right_icon.innerHTML = status;
                break;
        }        
    }
};

const sectionControl = {
    root: false,

    back() {
        // back button
        $( '#gh-left' ).off( 'click' );
        // sideNav event
        $( '#gh-left' ).sideNav();

        // body overflow
        $( 'body' ).css( 'overflow', 'scroll' );

        // set headers
        globalHeader2.setLogo( 'NUGU' );
        globalHeader2.setLeft( 'menu' );
        globalHeader2.setRight( 'column_view' );

        TweenMax.to( $( '#inner-page' ), .33, { left: '100%', ease: Strong.easeInOut, onComplete: function() {
            $( '#inner-page' ).html('');
        }});
        
    }, 

    load( url ) {
        this.root = false

        // jquery dom load
        $( '#inner-page' ).load( url, ( res, req, b ) => {
            if ( req !== 'success' ) return false;
            // res
            $(this).html( res );

            // nav out
            $( '#gh-left' ).sideNav( 'hide' );

            // set headers
            globalHeader2.setLogo( 'NUGU 활용하기' );
            globalHeader2.setLeft( 'back' );
            globalHeader2.setRight( 'none' );

            // body overflow
            $( 'body' ).css( 'overflow', 'hidden' );

            // section in
            TweenMax.to( $( '#inner-page' ), .33, { left: 0, ease: Strong.easeOut, onComplete: function() {
                // disable sideNav
                $( '#gh-left' ).sideNav('destroy');

                // back button
                $( '#gh-left' ).on( 'click', function( event ){
                    sectionControl.back();
                });

                // NUGU Guide open test
                document.querySelector( '#gc-test' ).addEventListener( 'click', event => userGuide.toggle() );

            }});

        });
    },

    load2( url ) {
        this.root = false

        // jquery dom load
        $( '#inner-page' ).load( url, ( res, req, b ) => {
            if ( req !== 'success' ) return false;
            // res
            $(this).html( res );

            // nav out
            $( '#gh-left' ).sideNav( 'hide' );

            // set headers
            globalHeader2.setLogo( '데일리 브리핑 활용하기' );
            globalHeader2.setLeft( 'none' );
            globalHeader2.setRight( 'close' );

            // body overflow
            $( 'body' ).css( 'overflow', 'hidden' );

            // section in
            TweenMax.to( $( '#inner-page' ), .33, { left: 0, ease: Strong.easeOut, onComplete: function() {
                // disable sideNav
                $( '#gh-left' ).sideNav('destroy');

                // back button
                $( '#gh-left' ).on( 'click', function( event ){
                    sectionControl.back();
                });

            }});
        });
    }
}

const vc_container = document.getElementById( 'vc-container' );


function collectionEvent() {
    let ug = userGuide;

    $( '.gc-bul' ).click( function( event ){
        ug.current = $( this );
        ug.toggle();
    });
}

class ViewController {
    constructor( url, label, right ) {
        // create dom
        this.elem = create( 'div' );
        this.elem.addClass( 'inner-page' );
        this.label = label;
        this.right = right ? right : 'chat';

        // append
        vc_container.appendChild( this.elem );

        // tween
        this.tween = TweenMax.from( this.elem, 0.55, { left: '100%', ease: Strong.easeOut });
        this.tween.pause();

        $( this.elem ).load( url, ( res, req, b ) => {
            $( this ).html( res );

            if ( label == 'NUGU 활용하기' )
                collectionEvent();

            $( this.elem ).find( '.nc' ).click( function( event ){
                let $et = $(event.currentTarget);
                let url = $et.data( 'nc' );
                let label = $et.data( 'label' );
                let right = $et.data( 'right' );
                nc.load( url, label, right );
            });
            this.show();
        });
    }

    show() {
        this.tween.resume();
    }

    hide() {
        let elem = this.elem;
        this.tween.eventCallback( 'onReverseComplete', function() {
            elem.remove();
        });
        this.tween.reverse();
    }
}

const rightObj = {
    '멜론': 'none',
    'none': 'none'
}

class NavigationControl {
    constructor () {
        this.hasChild    = false;
        this.currentView = 'root';
        this.header = globalHeader2;
        this.childs      = [];
    }

    setHome() {
        this.header.setLeft( 'menu' );
        this.header.setRight( 'column_view' );
        this.header.setLogo( 'NUGU' );
    }

    setHeader( left, logo, right ) {
        this.header.setLeft( left )
        this.header.setLogo( logo );
        this.header.setRight( right );
    }

    loadAtSNB( url, label, right ) {
        let right_icon = right;

        if ( label && rightObj[label] ) {
            right_icon = rightObj[label];
        }

        if ( !right )
            right_icon = 'none';

        this.hasChild = true;

        // hide snb
        $( '#gh-left' ).sideNav( 'hide' );

        this.setHeader( 'back', label, right_icon );
        this.childs.push( new ViewController( url, label, right ) )
    }

    load( url, label, right ) {
        let right_icon = 'chat';

        if ( label && rightObj[label] ) {
            right_icon = rightObj[label];
        }

        if ( !right )
            right_icon = 'none';

        this.hasChild = true;
        this.setHeader( 'back', label, right_icon );

        // create and push
        this.childs.push( new ViewController( url, label, right_icon ) );
    }


    back() {
        if ( this.hasChild ) {
            let last = this.childs[this.childs.length - 1];
            last.hide();
            this.childs.pop();
        }

        if ( !this.childs.length ) {
            this.hasChild = false;
            this.setHome();
        } else {
            let last = this.childs[this.childs.length - 1];
            this.setHeader( 'back', last.label, last.right );
        }
    }
}

// navigation control;
const nc = new NavigationControl();

// window.addEventListener( 'scroll', function(event) {
//     document.body.style.overflow = 'hidden';
// }, false);

const sc = document.querySelectorAll( '.section-control' );

/*
$('.section-control').on( 'click', event => {
    const elem = event.currentTarget;
    const sectionURL = elem.data( 'section' );

    sectionControl.load( sectionURL );

});
*/

function testFunc() {
    sectionControl.load2( '/guide/sample' );
}


// index init
$.getJSON( 'data/service.json' ).done( data => {
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
    renderBasicAndRandom();

    $( '.nc' ).click( function( event ){
        let $et = $(event.currentTarget);
        let url = $et.data( 'nc' );
        let label = $et.data( 'label' );
        let right = $et.data( 'right' );


        if( $et.data( 'snb' ) ) {
            nc.loadAtSNB( url, label, right );
        } else {
            nc.load( url, label, right );

            if ( url == '/ptype/melon/account' ) {
                event.currentTarget.dataset.nc = '/melon';
                event.currentTarget.dataset.right = 'chat';
            }
        }
    });
});


// gh-back events

$( '#gh-back' ).on( 'click', function( event ){ nc.back() });

$( '#gh-right-chat' ).on( 'click', function( event ){
    let cgi = {};

    switch( cg ) {
        case 'melon':
            cgi = { label: '멜론 활용하기', url: '/melon-guide', right: false };
            break;
        case 'weather':
            cgi = { label: '날씨 활용하기', url: '/weather-guide', right: false };
            break;
    }

    nc.load( cgi.url, cgi.label, cgi.right );

});













