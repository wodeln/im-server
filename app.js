let express=require('express');
let im =require('./routers/im.js');
let path = require('path');
let mongoose = require('./mongo/mongoose.js');
let tokenUtil = require('./util/token');
let db = mongoose();
let app=new express();

app.use('/public',express.static(path.join(__dirname, 'public')));

app.use(function (request,response,next) {
    let token = request.get("Authorization");
    if(typeof token == 'undefined' || !tokenUtil.checkToken(token)){
        response.sendStatus(401);
    }else {
        next();
    }
});

app.use('/im/v1',im);
app.use('/v1',im);
app.listen(3001,'is.com',function () {
    console.log("server started")
});