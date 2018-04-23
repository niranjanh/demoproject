
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

app.post('/updateArchitect', function(req, res){ 

     dbobj = db1.db("architects");
     

     var oldid = req.body.oldid;
     var oldnameA = req.body.oldname; 

     var newid = req.body.id;
     var newnameA = req.body.name; 
    
   
   
     var myObj = {
         "id" : oldid,
         "name" : oldnameA
     };

     var newObj = {$set: {
         "id":newid,
         "name":newnameA
     }};

     dbobj.collection("architectsTable").updateOne(myObj,newObj,
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










