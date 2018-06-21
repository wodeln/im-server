var express=require('express');
var router = express.Router();

//  /admin/goods
router.get('/',function(req,res){
    res.send('user index');
});

module.exports = router;