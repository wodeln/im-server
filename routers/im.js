var express=require('express');
var router = express.Router();

var user=require('./im/user.js');
var following=require('./im/following.js');
router.use('/user',user);
router.use('/',user);
router.use('/following',following);
module.exports = router;