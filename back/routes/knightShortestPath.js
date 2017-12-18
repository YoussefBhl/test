var express = require('express');
var router = express.Router();
import {verifyParam, shortestPath} from '../utils/index'

//eq.params, req.body, or req.query
/* GET users listing. */
router.get('/', function(req, res, next) {
    const {knightPosition, wantedPosition}  = req.query;
    if (verifyParam(wantedPosition) && verifyParam(knightPosition) ){
        const path = shortestPath(wantedPosition,knightPosition);
        res.send({'code': 204, 'success': path})
    }
    else {
        res.send({'code': 400, 'error': 'Paramaters fault'})
    }
});


module.exports = router;
