var fs = require('fs')
var http = require('http');
var express = require('express');
var app = express();
var parser = require('body-parser');
app.use(parser.json())
app.route('/getAll').get((req, res) => {
    var dat = JSON.parse(fs.readFileSync('emp.json'));
    for (var e of dat.employee) {
        console.log("Id : " + e.empId);
        console.log("Name : " + e.empName);
        console.log("Salary : " + e.empSalary);
        console.log("Address : ");
        console.log("City : " + e.empAddress.city);
        console.log("State : " + e.empAddress.state);
    }
    res.status(200).send(dat)
})

app.route('/getOf').post((req, res) => {
    var state = req.body.state;
    console.log(state);
    var dat = JSON.parse(fs.readFileSync('emp.json'));
    var e
    for (e of dat.employee) {
        if (e.empAddress.state == state) {
            console.log("Id : " + e.empId);
            console.log("Name : " + e.empName);
            console.log("Salary : " + e.empSalary);
            console.log("Address : ");
            console.log("City : " + e.empAddress.city);
            console.log("State : " + e.empAddress.state);
            res.status(200).send(e)
        }
    }
    res.status(200).send("Not found!!!")
})

app.route('/update').post((req, res) => {
    var id = req.body.id;
    var city=req.body.city;
    var dat = JSON.parse(fs.readFileSync('emp.json'));
    var e
    for (e of dat.employee) {
        if (e.empId == id) {
            e.empAddress.city=city;
            break;
        }
    }
    res.status(200).send(e)
    fs.writeFileSync('emp.json',JSON.stringify(dat));
})

app.route('/add').post((req,res)=>{
    var e={
            "empId": req.body.id,
            "empName": req.body.name,
            "empSalary": req.body.salary,
            "empAddress": {
                "city": req.body.city,
                "state": req.body.state
            }
        }
        var dat = JSON.parse(fs.readFileSync('emp.json'));
        dat.employee.push(e);
        res.status(200).send(dat);
        fs.writeFileSync('emp.json',JSON.stringify(dat));
})

app.listen(2200, (err, res) => {
    if (err) throw err;
    console.log("Server started");
})