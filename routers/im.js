var express=require('express');
var router = express.Router();

var user=require('./im/user.js');
router.use('/user',user);
router.use('/',user);
module.exports = router;