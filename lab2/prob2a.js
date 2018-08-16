var mongo = require('mongodb').MongoClient;
var http = require('http');
var express = require('express');
var app = express();
var cors = require('cors');
var parser = require('body-parser');

var url = "mongodb://localhost:27017/test";


app.use(cors())


app.use(parser.json());
app.route('/getAll').get((req, res) => {
  console.log("GET Invoked");
  mongo.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection('products').find().toArray(function (err, response) {
      if (err) throw err;
      console.log("Data Read");
      console.log(response);
      res.status(201).send(response);
    });
    db.close();
  });
});

app.route('/post', cors()).post((req, res) => {
  console.log("POST Invoked");
  console.log(req.body);
  var id=(req.body.id);
  var name=req.body.name;
  var cost=req.body.cost;
  var desc=req.body.desc;
  var query={"productId":id,"productName":name,"productCost":cost,"productDescription":desc}
  mongo.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection('products').insert(query,function (err, response) {
      if (err) throw err;
      console.log("Data Written");
      console.log(response);
      res.status(200).send(response);
    });
    db.close();
  });
});

app.route('/getOne').post((req, res) => {
  console.log("GET One Invoked");
  console.log(req.body);
  var id=(req.body.id);
  var query={"productId":id}
  mongo.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection('products').find(query).toArray(function (err, response) {
      if (err) throw err;
      console.log("Got the product");
      console.log(response);
      res.status(200).send(response);
    });
    db.close();
  });
});

app.route('/del').delete((req,res)=>{
  console.log("Delete Invoked");
  console.log(req.body);
  var id=(req.body.id);
  var query={"productId":id}
  mongo.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection('products').remove(query,function (err, response) {
      if (err) throw err;
      console.log("Got the product");
      console.log(response);
      res.status(200).send(response);
    });
    db.close();
  });
})

app.route('/update').put((req,res)=>{
  console.log("Delete Invoked");
  console.log(req.body);
  var oid=(req.body.oid);
  var nid=(req.body.nid);
  var query={"productId":oid}
  var upquery={$set:{"productId":nid}}
  mongo.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection('products').updateOne(query,upquery,function (err, response) {
      if (err) throw err;
      console.log("Got the product");
      console.log(response);
      res.status(200).send(response);
    });
    db.close();
  });
})

app.listen(4500,function(err,res){
  console.log("App Started");
})