let express = require('express');
let router = express.Router();
let count = require('../../util/Counter');
let tokenUtil = require('../../util/token');
let User = require('../../models/User');
let Following = require('../../models/Following');


router.get('/', function (req, res) {
    res.send('user index');
});

router.get('/addUser', function (req, res) {
    let seqPromis = count.getNextSequence("userid");
    seqPromis.then(
        (result) => {
            let user = new User({
                user_nickname: "隔壁老王",
                user_mobile: '',
                user_email: 'w2@163.com',
                user_password: '12344',
                user_avatar: '/public/images/upload/xjj2.jpg',
                user_age: 108,
                user_sex: '男',
                user_province: '上海',
                user_city: '奉贤',
                user_stata_message: '看我的名字，看我的名字，我的名字！！！',
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

router.get('/user', function (req, res) {
    let hs_id = req.query.hsid;
    let attentioned = false;
    let attentioneMe = false;
    User.findOne({user_id: hs_id})
        .exec()
        .then(
            (doc) => {
                let obj = JSON.parse(doc);
                Following.find(
                    {
                        user_id: hs_id,
                        follow_user_id: req.session.user.userid
                    }
                ).exec().then(
                    (doc)=>{
                        if(doc){

                        }
                    }
                );
                res.send(doc);
            }
        )
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
                    let sid = req.session.id;
                    let sessionUser = {
                        "username": doc.user_email == "" ? doc.user_mobile : doc.user_email,
                        "userid": doc.user_id
                    }
                    let payloadObj = {
                        "iss": "bolean",
                        "sid": sid,
                        "sessionUser": sessionUser
                    }

                    let token = tokenUtil.createToken(payloadObj, '10000');
                    req.session.user = sessionUser;
                    let result = {
                        user_info: {
                            user_name: doc.user_email == "" ? doc.user_mobile : doc.user_email,
                            user_age: doc.user_age,
                            user_id: doc.user_id,
                            user_avatar: doc.user_avatar,
                            user_stata_message: doc.user_stata_message
                        },
                        token: token
                    }
                    if (token) res.send(result);
                }
            },
            (err) => {
                console.log(err);
            }
        );
});

module.exports = router;