alert( 'holla' );
$('.snb').sideNav();
$('#apps').modal({
    opacity: 0.9
});

// temp events
function domino() {
    $('#domino').slideDown(333);
}

// close domino events
$('#domino').on('click', function(event) {
    $(event.currentTarget).slideUp(300);
});

// Playbacks
var pb_collapse = document.querySelector('#pb-collapse');
var pb = document.querySelector('#playback');
// Playback:Mini
var pbm = document.querySelector('#playback-mini');

var pbm_open = function () {
    TweenMax.to(pbm, 0.4, { height: '66px', ease: Strong.easeOut });
};
var pbm_close = function () {
    TweenMax.to(pbm, 0.3, { height: '0px' });
};
var pb_close = function () {
    TweenMax.to(pb, 0.6, { height: '0%', ease: Strong.easeInOut });
    TweenMax.to(pbm, 0.3, { height: '66px', delay: 0.6 });
};
var pb_open = function () {
    TweenMax.to(pb, 0.6, { height: '100%', ease: Strong.easeOut });
};
pb_collapse.addEventListener('click', pb_close);

// service nav
var apps = $('#apps');
var navTL = new TimelineMax();
var items = document.querySelectorAll('.app-item');

// TL:modal
navTL.add(TweenMax.to(apps, 0.3, { height: '100%', ease: Strong.easeOut }), 'modal');
// TL:icons
navTL.add('icons');
// each icons tween
$( '.app-item' ).each( function( i, item ){
    navTL.add(TweenMax.from(item, 0.33, { x: "-=20", y: "+=20", opacity: 0 }), 'modal+='+ 0.1 * i +'' }
})
// stop and ready
navTL.stop();

// open service nav
$('#open-apps').click(function(event){ navTL.play()});
// close service nav
$('#close-apps').click(function(event){navTL.reverse()});
