'use strict';

/*=====================================
=            A4B Lib + ES6            =
=====================================*/
var create, getRandomIntInclusive, trace;

let test = document.createElement( 'div' );

// set attributes
Element.prototype.attrs = function( attrs ) {
    for ( let [key, val] of Object.entries( attrs ) ) {
        this.setAttribute( key, val );
    }
}

// get/set css
Element.prototype.css = function( attrs, value ) {

    if ( typeof attrs == 'object' ) {

        // when attrs is object > set multiple css
        for ( let [key, val] of Object.entries( attrs ) ) {
            this.style[key] = val;
        }

    } else if ( value ) {

        // when attr is string > set a css
        this.style[attrs] = value;

    } else {

        // get value via attr
        // return window.getComputedStyle( this, null )[attrs];
        return this.style[attrs];
    }
}


// get/set data
Element.prototype.data = function( keys, value ) {
    if ( typeof keys == 'object' ) {
        
        // multiple dataset
        for ( let [key, val] of Object.entries( keys ) ){
            this.dataset[key] = val;
        }

    } else if ( !keys ) {

        // get all dataset ( DOMStringMap )
        return this.dataset;

    } else if ( value ) {
        
        // single dataset
        this.dataset[keys] = value;

    } else {

        // get
        return this.dataset[keys];

    }

}

// add Class
Element.prototype.addClass = function(str) {
    this.classList.add(str);
};

// remove Class
Element.prototype.removeClass = function(str) {
    this.classList.remove(str);
};

// has Class?
Element.prototype.hasClass = function(str) {
    return this.classList.contains(str);
};


// Element.prototype.hide = function() {
//   if (this.style.display === 'inline-block') {
//     this.dataset.display = 'inline-block';
//   } else if (this.style.display === 'inline') {
//     this.dataset.display = 'inline';
//   }
//   this.style.display = 'none';
// };

// Element.prototype.show = function() {
//   if (this.dataset.display) {
//     this.style.display = this.dataset.display;
//   } else {
//     this.style.display = 'block';
//   }
// };

// Element.prototype.toggle = function() {
//   if (this.style.display === 'none') {
//     this.show();
//   } else {
//     this.hide();
//   }
// };

// Number.prototype.doubleDigits = function() {
//   if (this < 10) {
//     return "0" + this;
//   } else {
//     return "" + this;
//   }
// };

// String.prototype.doubleDigits = function() {
//   if (this < 10) {
//     return 0 + this;
//   } else {
//     return this;
//   }
// };

// const create = function( tag, attrs ) {
//     let elem = document.createElement( tag );

//     if ( attrs ) {
        
//     }
// }

create = function(tag, attrs) {
  var attr, data, dom, name, val;
  dom = document.createElement(tag);
  if (attrs) {
    switch (typeof attrs) {
      case 'string':
        if (attrs.charAt(0) === '.') {
          dom.setAttribute('class', attrs.slice(1));
        } else {
          dom.setAttribute('id', attrs.slice(1));
        }
        break;
      default:
        for (attr in attrs) {
          val = attrs[attr];
          if (attr === 'data') {
            for (name in val) {
              data = val[name];
              dom.dataset[name] = data;
            }
          } else {
            dom.setAttribute(attr, val);
          }
        }
    }
  }
  return dom;
};

getRandomIntInclusive = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Array.prototype.min = function() {
  return Math.min.apply(Math, this);
};

Array.prototype.max = function() {
  return Math.max.apply(Math, this);
};

Array.prototype.clone = function() {
  var array;
  return array = this.slice(0);
};

Array.prototype.shuffle = function(self) {
  var duplicate, i, len, mem, result;
  if (self == null) {
    self = false;
  }
  if (self) {
    mem = this;
    len = mem.length;
    while (len) {
      i = Math.floor(Math.random() * len--);
      this.push(mem.splice(i, 1)[0]);
    }
  } else {
    result = [];
    duplicate = this.slice(0);
    len = duplicate.length;
    while (len) {
      i = Math.floor(Math.random() * len--);
      result.push(duplicate.splice(i, 1)[0]);
    }
    return result;
  }
};

trace = function(str) {
  if (is_debug) {
    console.log(str);
  }
};
