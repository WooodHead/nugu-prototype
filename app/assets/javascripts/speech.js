'use strict';

/*===================================
=            speech API            =
===================================*/



// Voice
const wakeup = new webkitSpeechRecognition();
const recognition = new webkitSpeechRecognition();
const grammars = new webkitSpeechGrammarList();
const grammar = '#JSGF V1.0; grammar funcs; public <funcs> = 도미노|피자;';
// test start button
const startButton = document.querySelector( '#logo' );
let recog_status = false;
const vr_domino = new SpeechSynthesisUtterance();
vr_domino.text = "김 누구님, 반갑습니다. 아리아, 라고 저를 불러 주시 면 대화 를 시작 할 수 있어요. 오늘 날씨 를 물어 봐 주실래요?";
vr_domino.lang = 'ko-KR';


// wakeup
wakeup.lang = 'ko-KR';
wakeup.interimResults = false;
wakeup.maxAlternatives = 1;

wakeup.onresult = ( event ) => {
    const last = event.results.length - 1;
    const value = event.results[last][0].transcript;

    if ( value == '아리아' || value == '자리야' || value == '자리아' ) return readySpeech();
};

// recognition settings
recognition.lang = 'ko-KR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
grammars.addFromString( grammar, 1 );
recognition.grammars = grammars;

function readySpeech() {
    wakeup.stop();
    console.log( 'ㅇㅇ?' );
    document.getElementById('logo').style.color = 'red';
    recog_status = true;
    recognition.start();

    $( '#logo' ).on( 'click', ( event ) => {
        endSpeech();
    });
}

function endSpeech() {
    recog_status = false;
    document.getElementById('logo').style.color = 'black';
    recognition.stop();
    wakeup.start();
    $( '#logo' ).off( 'click' );
}

const quoteBox = document.querySelector( '#quoteEx' );
const speechFuncs = ( value )=> {
    // if ( value == '도미노 피자 시켜 줘' || value == '안녕하세요' ) {
    //     speechSynthesis.speak(vr_domino);
    //     $( '#domino' ).slideDown( 333 );
    // }

    // if ( value == '오늘의 픽 보여 줘' )
    //     navTL.play();

    // if ( value == '그만' )
    //     navTL.reverse();

    // if ( value == '아리아 인기 음악 틀어 줘' ) {
    //     // $( '#test' ).slideDown( 333 );
    //     $(quoteBox.children[0]).hide( 300 ).html( '아리아<br>김광석의 사랑했지만<br>들려줘' ).show( 333 );
    //     $(quoteBox.children[1]).text( '아리아, 이노래 뭐야?' );
    //     $(quoteBox.children[2]).text( '아리아, 최신 노래 들려줘' );
    // }

    // if ( value == '노래 틀어줘' )
    //     pb_open();

    // if ( value == '노래 그만' )
    //     pbm_close();
}


// speech result
recognition.onresult = ( event ) => {
    const last = event.results.length - 1;
    const value = event.results[last][0].transcript;

    // cards_collection.forEach( card => card.checkQuotes( value ) );
    console.log( value );
    if ( value == '도미노피자 시켜 줘' || value == '도미노 피자 시켜 줘'  ) {
        vr_domino.text = '피자 주문이 완료 되었습니다';
        speechSynthesis.speak(vr_domino);
        testStatus( '#status-domino' );
    }

    if ( value == '택시 불러 줘' || value == '택시 불러줘' ) {
        vr_domino.text = '콜택시 신청이 완료 되었습니다.';
        speechSynthesis.speak(vr_domino);
        testStatus( '#status-taxi' );
    }
};


// speech end
// wakeup.start();
recognition.onspeechend = function() { endSpeech() };
recognition.onnomatch = function() { console.log( 'failed' ) };
recognition.onerror = ( event ) => { console.log( event.error ) };
