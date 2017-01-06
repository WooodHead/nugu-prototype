const express = require('express');
const mongoose = require('mongoose');
const co = require('co');
const router = express.Router();

const Category = mongoose.model( 'Category' );

/* GET home page. */
router.get('/', (req, res) => {
    res.render( 'index', {
        title: 'NUGU',
        root: true
    });
});

// test melon
router.get('/melon', (req, res) => {
    res.render( 'ptype/melon/index', {
        title: 'MELON',
        root: false
    });
});

router.get('/melon2', (req, res) => {
    res.render( 'melon2', {
        title: 'MELON',
        root: false,
        local: '/'
    });
});

router.get('/domino', (req, res) => {
    res.render( 'domino', {
        title: '주소설정',
        root: false
    });
});

router.get('/skill', (req, res) => {
    res.render( 'skill', {
        title: '7분 운동',
        root: false
    });
});

// event tests
router.get( '/event', ( req, res ) => {
    res.render( 'event', {
        title: 'NUGU',
        root: true
    })
});


// masonry index
router.get( '/masonry', co.wrap(function* ( req, res ) {

    const categories = yield Category.find().sort({ order: 1 }).populate('childs').exec();

    res.render( 'masonry', {
        title: 'NUGU',
        root: true,
        categories: categories
    });
}));

// guide
router.get( '/guide', ( req, res ) => {
    res.render( 'guide', {
        title: 'NUGU 활용하기',
        root: false
    })
});

// guide sample
router.get( '/guide/sample', ( req, res ) => {
    res.render( 'guide/sample', {
        title: '날씨 활용하기',
        root: false
    })
});

// guide sample2
router.get( '/guide/sample2', ( req, res ) => {
    res.render( 'guide/sample2', {
        title: '날씨 활용하기',
        root: false
    })
});

// guide sample2
router.get( '/weather-guide', ( req, res ) => {
    res.render( 'weather_guide', {
        title: '날씨 활용하기',
        root: false
    })
});

// guide sample2
router.get( '/melon-guide', ( req, res ) => {
    res.render( 'melon_guide', {
        title: '날씨 활용하기',
        root: false
    })
});





module.exports = router;