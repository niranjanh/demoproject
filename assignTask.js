
//var appjs = require("./app.js");
var mongo = require('mongodb');

var express = require('express'); 
var app = express(); 

var bp = require("body-parser");



app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
/*
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
*/

var url = "mongodb://localhost:27017/DemoProject";


var db1;

mongo.connect(url , function(err,db){

   if(err) throw err;

	console.log("success");
 	
  	db1=db;
	
});

var dbobj;

app.post('/assignTask', function(req, res){ 

     dbobj = db1.db("DemoProject");
     

     var id = req.body.id;
     var nameSP = req.body.name; 
     var task = req.body.task;
     var startDate = req.body.start_date;
     var endDate = req.body.end_date;
     var status = req.body.task_status;
   //console.log(req.body);
   var startD = new Date(startDate);
   var endD = new Date(endDate);
  //console.log("1");
     var myObj = {
         _id : id,
         name : nameSP
     };
   
     var newObj = {$set: {
         task : task,
         start_date : startD,
         end_date : endD,
         task_status : status
     }};
//console.log("2");
     dbobj.collection("serviceProvides").updateOne(myObj,newObj,
                    function(err,result){
                
                        if(err)
                          throw err;

                 res.send(result);
                
            });

//console.log("3");
});

app.listen(10000);




/*
{
  "id" : 3,
  "name" : "sp3",
  "task" : "code in java",
  "task_status" : "on going",
  "start_date" : "",
  "end_date" : ""
}
*/










