'use strict';

class A4BMasonry {

    /**
     * [constructor description]
     * @param  {DOMElement} container
     * @param  {Object} prop [ item_selector, size ]
     */
    
    constructor( container, prop ) {

        // position and size
        this.margin     = 0;
        this.column     = 0;
        this.pixel      = 0;
        this.size       = prop.size;

        this.sizer = document.querySelector( prop.sizer );

        // if
        if ( !container ) return false

        // set container
        this.container = container;
        this.container.css( 'position', 'relative' );

        // set selector
        this.selector = prop.selector;

        this.lazy = prop.lazy ? prop.laze : false;
        this.gap = prop.gap ? prop.gap : 0;
    }


    /**
     * calculate column by item size
     * @return {[type]} [description]
     */
    calc() {

        if ( !this.container ) return false
        // set container width;
        let container_width = this.container.offsetWidth;
        this.pixel = this.sizer.offsetWidth;

        // is size PERCENT or PX
        
        // if ( this.size <= 1 )
        //     this.pixel = Math.floor( container_width * this.size );

        // get max column
        this.column = Math.round( container_width / this.pixel );

        // calc gap
        if ( this.gap ) {
            // gap total
            let gapTotal = ( this.column - 1 ) * this.gap;
            // get column with gap
            this.column = Math.round( ( container_width - gapTotal ) / this.pixel );
            // get margin
            let content_width = this.column * this.pixel;
            this.margin = Math.floor( ( container_width - content_width ) / 2 );
        }
    }

    /**
     * set all static HTML
     */
    init() {

        // calc
        this.calc();

        // init collection and heights
        this.collection = [];
        this.heights    = [];

        // block numbers
        this.columns    = [0];

        // items
        let items = document.querySelectorAll( this.selector );

        // init heights
        let count = this.column;
        while( count-- ) {
            this.heights.push(0);
        }

        // loop
        items.forEach( item => this.add( item ) );
    }

    // add item
    add( item ) {
        // get index before add
        let index = this.collection.length
        // add item
        this.collection.push( item );

        // get column by index
        let column     = index % this.column;
        // get min heights column
        // let minColumn  = this.heights.indexOf( Math.min(...this.heights) );
        let minColumn  = column;
        let left       = column * this.pixel + this.margin;

        /* this is it
        let item_block = Math.round( item.offsetWidth / this.pixel );
        // let column_index   = this.columns.length - 1;
        // let current_column = this.columns[column_index];

        // if ( current_column + item_block =< this.columns ) {
        //     // put
        //     left = current_column * this.pixel + this.margin;
        //     item.css( 'left', left + 'px' );
        //     // renew columns
        //     this.columns[column_index] += item_block;
        // } else {
        //     // block
        //     this.columns.push(0);
        // }

        // if ( current_block >= item_block ) {
        //     current_block -= item_block;
        //     left = current_block * this.pixel + this.margin;
        //     item.css({ top: this.heights[minColumn] + 'px', left: left + 'px' });
        //     this.columns[ci] -= item_block;
        // }

        // if ( !current_block ) {
        //     this.columns.push( this.column );
        // }

        // put
        // if ( current_block >= item_block ) {
        //     left = ( this.column - current_block ) * ( item_block * this.pixel ) + this.margin;
        //     item.css({ top: this.heights[minColumn] + 'px', left: left + 'px' });
        //     this.columns[ci] -= item_block;
        // }
        */
       
        // set css position ( via A4BLib )
        item.css({ top: this.heights[minColumn] + 'px', left: left + 'px' });
        item.data( 'column', minColumn.toString() );
        this.heights[minColumn] += item.offsetHeight;
        this.container.css( 'height', Math.max( ...this.heights ) + 'px' );
    }
}
