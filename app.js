var express=require('express');

var im =require('./routers/im.js');

var app=new express();

app.use('/im',im);
app.use('/',im);
app.listen(3001,function () {
    console.log("server started")
});