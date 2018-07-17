let express = require('express');
let im = require('./routers/im.js');
let path = require('path');
let mongoose = require('./mongo/mongoose.js');
let tokenUtil = require('./util/token');
let bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
let db = mongoose();
let app = new express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(cookieParser());
app.use(session({
    secret: 'this is VueIm',
    name: 'Bolean.org',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));


app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function (request, response, next) {

    let token = request.get("Authorization");
    let url = request.url;
    let pathArray = url.split("/");
    // console.log(pathArray);
    if(pathArray[1]!='socket.io'){
        if (pathArray[pathArray.length - 1] == 'doLogin' || pathArray[pathArray.length - 1] == 'addUser') {
            next();
        } else {
            let tokenResult = tokenUtil.checkToken(token);
            if (!tokenResult) {
                response.sendStatus(401);
            } else {
                if(request.session.id!=tokenResult.sessionId){
                    request.session.user=tokenResult.sessionUser;
                }
                request.session.touch();
                next();
            }
        }
    }
});

app.use('/im/v1', im);
app.use('/v1', im);


let onlineUser= new Map();
io.on('connection', function(socket){

    var query = socket.request._query;

    let user={
        user_id:query.user_id,
        socket_id:socket.id,
        user_avatar:query.user_avatar,
        user_nickname:query.user_nickname
    }

    onlineUser.set(query.user_id,user);

    socket.on('userMessage',function (msg) {
        console.log(msg);
    });

    socket.on('disconnect', (reason) => {
        onlineUser.forEach(function (value, key) {
            if(value.socket_id==socket.id){
                onlineUser.delete(key);
            }
        })
    });
});


server.listen(3001, function () {
    console.log("server started")
});