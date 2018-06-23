let express = require('express');
let router = express.Router();
let count = require('../../util/Counter');
let User = require('../../models/User');// 引入模型


router.get('/', function (req, res) {
    res.send('user index');
});

router.get('/addUser', function (req, res) {

    let seqPromis = count.getNextSequence("userid");

    seqPromis.then(
        (result) => {
            var user = new User({
                username: 'admin',
                password: '123',
                userid: result.seq
            });
            user.save((err) => { //添加
                if (!err) {
                    res.send("添加成功");
                } else {
                    console(err);
                }
                // console.log('save status:', err ? 'failed' : 'success');
            });
        },
        (err) => {
            reject(err);
        }
    )
    res.send("添加成功");
});


module.exports = router;