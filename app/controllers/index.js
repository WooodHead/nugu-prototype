const express = require('express');
const mongoose = require('mongoose');
const co = require('co');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render( 'index', {
        title: 'NUGU',
        root: true
    });
});

// test melon
router.get('/melon', (req, res) => {
    res.render( 'melon', {
        title: 'MELON',
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

// router.get( '/account', (req, res) => {
//     res.render( 'account', {
//         title: 'Account',
//         root: false
//     });
// });

router.get( '/store', (req, res)=> {
    res.render( 'store', {
        title: 'STORE',
        root: false,
    });
});

router.get( '/masonry', ( req, res )=> {
    res.render( 'masonry', {
        title: 'Masonry',
        root: true
    });
});

// grayscale
router.get( '/grayscale', ( req, res )=> {
    res.render( 'grayscale', {
        title: 'NUGU',
        root: true,
        grayscale: true
    });
});

// management
router.get( '/management', ( req, res )=> {
    res.render( 'management/index', {
        title: 'Management',
        csrf: req.csrfToken(),
        root: true
    });
});

module.exports = router;