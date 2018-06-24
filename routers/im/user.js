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
            let user = new User({
                user_true_name:"漂亮的小姐姐",
                user_mobile:'',
                user_email:'w@163.com',
                user_password:'12344',
                user_avatar:'/public/images/xjj.jpg',
                user_age:18,
                user_sex:'女',
                user_province:'上海',
                user_city:'奉贤',
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
    res.send("添加成功");
});

router.get('/users',function (req,res) {

    User.find(function (err,users) {
        if(!err){
            res.send(users);
        }
    });


});

module.exports = router;