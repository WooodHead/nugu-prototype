const express = require('express');
const router = express.Router();

// Index
router.get('/', (req, res) => {
    res.render( 'ptype/index', {
        title: 'NUGU',
        nav_type: 'a',
        root: true
    });
});

// Index B
router.get('/b', (req, res) => {
    res.render( 'ptype/index-b', {
        title: 'NUGU',
        nav_type: 'b',
        root: true
    });
});

router.get( '/disable', ( req, res )=> {
    res.render( 'ptype/disable', {
        title: 'NUGU',
        nav_type: 'a',
        root: true
    });
});

router.get( '/domino', ( req, res )=> {
    res.render( 'ptype/domino', {
        title: '도미노 피자',
        root: false
    });
});

router.get( '/bbq', ( req, res )=> {
    res.render( 'ptype/bbq', {
        title: 'BBQ 치킨',
        root: false
    });
});

// Address
router.get( '/address', ( req, res )=> {
    res.render( 'ptype/address/address', {
        title: '주소 설정',
        root: false
    });
});

// MELON: Account
router.get('/melon/account', (req, res) => {
    res.render( 'ptype/melon/account', {
        title: '멜론 연결',
        root: false
    });
});

// MELON: Index
router.get('/melon/index', (req, res) => {
    res.render( 'ptype/melon/account', {
        title: '멜론',
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

router.get( '/tid', ( req, res )=> {
    res.render( 'ptype/tid', {
        title: 'TID',
        root: false
    });
});

router.get( '/introduction', ( req, res ) => {
    res.render( 'ptype/introduction', {
        header: false
    });
});

router.get( '/init', ( req, res )=> {
    res.render( 'ptype/init', {
        title: 'NUGU',
        root: true
    })
});

router.get( '/smarthome', ( req, res )=> {
    res.render( 'ptype/o2o', {
        title: '스마트홈 연결',
        root: false
    });
});

router.get( '/7min', ( req, res ) => {
    res.render( 'ptype/7min',  {
        title: '7분 운동하기',
        root: false
    });
});

router.get( '/sitemap', ( req, res ) => {
    res.render( 'ptype/sitemap',  {
        title: 'map',
        root: false
    });
});
module.exports = router;