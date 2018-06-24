var express=require('express');
var im =require('./routers/im.js');
let path = require('path');
var mongoose = require('./mongo/mongoose.js');
var db = mongoose();

var app=new express();

app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/im/v1',im);
app.use('/v1',im);
app.listen(3001,'is.com',function () {
    console.log("server started")
});