'use strict';

const next_button = document.querySelector( '#next' );
const prev_button = document.querySelector( '#prev' );
const skip_button = document.querySelector( '#skip' );
const intro_image = document.querySelector( '#img-container' );
const ic          = document.querySelector( '#ic' );

const introduction = {
    page: 0,
    btn_label: '연결하기',

    // set button labeling
    setBtnLabel: function() {

        switch( this.page ) {
            case 0:
                this.btn_label = '연결하기';
                prev_button.style.visibility = 'hidden';
                skip_button.style.visibility = 'visible';
                break;
            case 4:
                this.btn_label = '시작하기';
                prev_button.style.visibility = 'hidden';
                skip_button.style.visibility = 'hidden';
                break;
            default:
                this.btn_label = '다음';
                prev_button.style.visibility = 'visible';
                skip_button.style.visibility = 'visible';
                break;
        }

        return next_button.innerHTML = this.btn_label;
    },

    setImage: function() {
        let left = -this.page * $( '#ic' ).width();
        TweenMax.to( intro_image, 0.66, { left: left, ease: Strong.easeInOut } );
    },

    // prev
    prev: function() {
        if ( this.page > 0 )
            this.page--;

        // set button label
        this.setBtnLabel();

    },

    // next
    next: function () {
        if ( this.page < 4 )
            this.page++;
    }
};

function next() {
    if ( introduction.page == 4 )
        window.location.href = '/ptype/init';

    introduction.next();
    introduction.setBtnLabel();
    introduction.setImage();

}

function prev() {
    introduction.prev();
    introduction.setBtnLabel();
    introduction.setImage();
}

function skip() {
    window.location.href = '/ptype/disable';
}

next_button.addEventListener( 'click', next );
prev_button.addEventListener( 'click', prev );
skip_button.addEventListener( 'click', skip );
