
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

app.post('/getAssignedTasks', function(req, res){ 

     dbobj = db1.db("architects");
     
      dbobj.collection("serviceProvides").find({"task":{$ne:"no task"}},{_id:0,task:1,id:1,name:1,"task status":1}).toArray(
		     function(err, result){ 
	    		if (err) throw err;
         
		//res.send("List of Service Providers");
    		//console.log(result);
            //dbobj.close();
               res.send(result);
  		});

});

app.listen(10000);















