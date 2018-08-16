var express = require('express');  
var app = express();
var bodyParser =require('body-parser')

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/Prob1.4.html" );
});


var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.post('/RegistrationSuccessPage',urlencodedParser, function (req, res) {
   var uname = req.body.username
   var pwd = req.body.pwd
  
    postData = "Your Name is :"+ uname+"\n" +"Your Password is :"+ pwd
   console.log(postData);
   res.send(postData)
    
   //res.sendFile(  "/registrationSuccess.html",postData);
    res.end()
});

app.listen(4000,function(){
    console.log("Running")
})