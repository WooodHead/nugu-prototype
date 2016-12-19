const express = require('express');
const router = express.Router();

// Index
router.get('/', (req, res) => {
    res.render( 'ptype/index', {
        title: 'NUGU',
        root: true
    });
});

// Index B
router.get('/b', (req, res) => {
    res.render( 'ptype/index-b', {
        title: 'NUGU',
        root: true
    });
});

// MELON: Account
router.get('/melon/account', (req, res) => {
    res.render( 'ptype/melon/account', {
        title: 'Melon'
    });
});

// MELON: Index
router.get('/melon/index', (req, res) => {
    res.render( 'ptype/melon/account', {
        title: 'Melon',
        root: false
    });
});

// Store: Index - recommandation
router.get('/store', (req, res) => {
    res.render( 'ptype/store/index', {
        title: 'APP MARKET',
        root: false,
        gnb_right: false
    });
});

// Store: Index - recommandation
router.get('/store/sample', (req, res) => {
    res.render( 'ptype/store/sample', {
        title: '7분 운동하기',
        root: false,
        gnb_right: false
    });
});

router.get( '/introduction', ( req, res ) => {
    res.render( 'ptype/introduction', {
        header: false
    });
});

module.exports = router;