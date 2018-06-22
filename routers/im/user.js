var express = require('express');
var router = express.Router();
var User = require('../../models/User');// 引入模型
//  /admin/goods
router.get('/', function (req, res) {
    res.send('user index');
});

router.get('/addUser', function (req, res) {
    var user = new User({
        username: 'admin',
        password: '123'
    });
    user.save((err) => { //添加
        if(!err){
            res.send("添加成功");
        }else{
            console(err);
        }
        // console.log('save status:', err ? 'failed' : 'success');
    });
});

module.exports = router;