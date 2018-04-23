
//var appjs = require("./app.js");
var mongo = require('mongodb');

var express = require('express'); 
var app = express(); 

var bp = require("body-parser");



app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());


var url = "mongodb://localhost:27017/architects";


var db1;

mongo.connect(url , function(err,db){

   if(err) throw err;

	console.log("success");
 	
  	db1=db;
	
});

var dbobj;

app.post('/addSP', function(req, res){ 

     dbobj = db1.db("architects");
     

     var id = req.body.id;
     var nameSP = req.body.name; 
     var task = req.body.task;
     var startDate = req.body.start_date;
     var endDate = req.body.end_date;
     var status = req.body.task_status;
    
     var myObj = {
         "id":id,
         "name":nameSP,
         "task":task,
         "start_date":startDate,
         "end_date":endDate,
         "status":status
     };
     
     dbobj.collection("serviceProvides").insertOne(myObj,
                    function(err,result){
                
                        if(err)
                          throw err;

                 res.send(result);
                
            });

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










