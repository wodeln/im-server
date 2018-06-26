let express = require('express');
let router = express.Router();
let count = require('../../util/Counter');
let tokenUtil = require('../../util/token');
let User = require('../../models/User');// 引入模型


router.get('/', function (req, res) {
    res.send('user index');
});

router.get('/addUser', function (req, res) {
    let seqPromis = count.getNextSequence("userid");
    seqPromis.then(
        (result) => {
            let user = new User({
                user_true_name: "我是一个小哥哥",
                user_mobile: '15021464551',
                user_email: '',
                user_password: '12344',
                user_avatar: '/public/images/xgg.jpg',
                user_age: 26,
                user_sex: '男',
                user_province: '上海',
                user_city: '奉贤',
                user_stata_message: '我只是帅的不够明显而已呢',
                user_id: result.seq
            });
            user.save((err) => { //添加
                if (!err) {
                    res.send("添加成功");
                } else {
                    console(err);
                }
            });
        },
        (err) => {
            reject(err);
        }
    )
});

router.get('/users', function (req, res) {

    User.find(function (err, users) {
        if (!err) {
            res.send(users);
        }
    });


});

router.post('/doLogin', function (req, res) {
    User.findOne({
        $or: [{
            user_name: req.params.user_name,
            password: req.params.password
        }, {
            user_name: req.params.user_name,
            password: req.params.password
        }]
    })
    .exec()
    .then(
        (doc) => {
            if (doc) {
                let payloadObj = {
                    "iss": "bolean",
                    "name": doc.user_email == "" ? doc.user_mobile : doc.user_email
                }
                let token = tokenUtil.createToken(payloadObj, '100000');
                if (token) res.send(token);
            }
        },
        (err) => {
            console.log(err);
        }
    );
});

module.exports = router;