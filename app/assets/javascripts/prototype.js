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



// open service nav
$( '#open-apps' ).click( event => navTL.play() );
// close service nav
$( '#close-apps' ).click( event=> navTL.reverse() );

// Voice
const recognition = new webkitSpeechRecognition();
const grammars = new webkitSpeechGrammarList();
const grammar = '#JSGF V1.0; grammar funcs; public <funcs> = 도미노|피자;';
// test start button
const startButton = document.querySelector( '#logo' );
let recog_status = false;
const vr_domino = new SpeechSynthesisUtterance();
vr_domino.text = "피자 주문이 완료되었습니다";
vr_domino.lang = 'ko-KR';








// recognition settings
recognition.lang = 'ko-KR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
grammars.addFromString( grammar, 1 );
recognition.grammars = grammars;

startButton.addEventListener( 'click', event => {
    if ( !recog_status ) {
        recog_status = true;
        event.currentTarget.style.color = 'red';
        recognition.start();
    } else {
        recog_status = false;
        event.currentTarget.style.color = 'black';
        recognition.stop();
    }
});

const quoteBox = document.querySelector( '#quoteEx' );

const speechFuncs = ( value )=> {
    if ( value == '도미노 피자 시켜 줘' || value == '안녕하세요' ) {
        speechSynthesis.speak(vr_domino);
        $( '#domino' ).slideDown( 333 );
    }

    if ( value == '오늘의 픽 보여 줘' )
        navTL.play();

    if ( value == '그만' )
        navTL.reverse();

    if ( value == '아리아 인기 음악 틀어 줘' ) {
        // $( '#test' ).slideDown( 333 );
        $(quoteBox.children[0]).hide( 300 ).html( '아리아<br>김광석의 사랑했지만<br>들려줘' ).show( 333 );
        $(quoteBox.children[1]).text( '아리아, 이노래 뭐야?' );
        $(quoteBox.children[2]).text( '아리아, 최신 노래 들려줘' );
    }

    if ( value == '노래 틀어줘' )
        pb_open();

    if ( value == '노래 그만' )
        pbm_close();
}


// speech result
recognition.onresult = ( event ) => {
    const last = event.results.length - 1;
    const value = event.results[last][0].transcript;

    console.log( value );
    speechFuncs( value );
};


// speech end
recognition.onspeechend = function() {
    recognition.stop()
    recog_status = false;
    startButton.style.color = 'black';
}
recognition.onnomatch = function() { console.log( 'failed' ) }
recognition.onerror = ( event ) => { console.log( event.error ) }














