var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render( 'index', {
        title: 'NUGU',
        root: true
    });
});

router.get( '/account', (req, res) => {
    console.log( 'dd?' );
    res.render( 'account', {
        title: '으앙 계정연결',
        root: false
    });
});

module.exports = router;