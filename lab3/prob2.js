var fs = require('fs');
var mongo=require('mongodb').MongoClient;
var http = require('http');
var express = require('express');
var app = express();
var parser = require('body-parser');
app.use(parser.json())
url="mongodb://localhost:27017/test"


app.route('/getAll').get((req, res) => {
    mongo.connect(url,(err,db)=>{
        var dbo=db.db('test');
        dbo.collection('Employees').find().toArray((err,response)=>{
            console.log(response);
            res.status(200).send(response);
        })
    })
})

app.route('/getOf').post((req, res) => {
    var state = req.body.state;
    var query={"empAddress.state":state}
    mongo.connect(url,(err,db)=>{
        var dbo=db.db('test');
        dbo.collection('Employees').find(query).toArray((err,response)=>{
            console.log(response);
            res.status(200).send(response);
        })
    })
})

app.route('/update').post((req, res) => {
    var id = req.body.id;
    var city=req.body.city;
    var query={"empId":id}
    var upquery={$set:{"empAddress.city":city}}
    mongo.connect(url,(err,db)=>{
        var dbo=db.db('test');
        dbo.collection('Employees').updateOne(query,upquery,(err,response)=>{
            console.log(response);
            res.status(200).send(response);
        })
    })
})

app.route('/add').post((req,res)=>{
    var query={"empId": req.body.id,
            "empName": req.body.name,
            "empSalary": req.body.salary,
            "empAddress": {
                "city": req.body.city,
                "state": req.body.state
            }}
        mongo.connect(url,(err,db)=>{
        var dbo=db.db('test');
        dbo.collection('Employees').insert(query,(err,response)=>{
            console.log(response);
            res.status(200).send(response);
        })
    })
})

app.listen(2250, (err, res) => {
    if (err) throw err;
    console.log("Server started");
})