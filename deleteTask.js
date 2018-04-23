
var appjs = require("./app.js");
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

app.post('/deleteTask', function(req, res){ 

     dbobj = db1.db("architects");
     
    var usr = req.body.username; 
	var pwd = req.body.password;
	var role = req.body.role;

     var task = req.body.task;
      
     var flag = 0;
    
     var myObj = { $set : {
         task : " ",
         taskStatus : " "
     }};
     var query = { name : usr };

	dbobj.collection(role).find(query).toArray(function(err, result) {
		
		if (err) throw err;

	    var dbusr = result[0].name;
	
        var dbpwd = result[0].password;
	    //db1.close();

      	if(usr === dbusr && pwd ===  dbpwd)
	     {
            //res.send('hello');    //return res.redirect('/second.html');
            console.log("hiii");
		    flag = 1;
	     }
		else
		 {
             console.log("invalid password/username or you are not a admin");
	        //res.send("invalid password/username or you are not a admin");
      }
          

     if(flag === 1){
    
     dbobj.collection("serviceProvides").updateOne({"task":task, "status" : taskStatus},myObj,
                    function(err,result){
                
                        if(err)
                          throw err;

                 res.send(result);
                
            });
                   
     }

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




var deleteTaskLayer = function(req, res,next){ 

    dbobj = db1.db("DemoProject");
     
    /* var usr = req.body.username; 
	var pwd = req.body.password;
	var role = req.body.role; */
    //dbobj = db1.db("DemoProject");
     var task = req.body.taskrandomNumber;
    
     var myObj = { $set : {
         task : " ",
         task_status : " "
     }};

	 if(role === 'admin' && flag === 1){
    
     dbobj.collection("serviceProvides").updateOne({"task":task},myObj,
                    function(err,result){
                
                        if(err)
                          throw err;

                 comsole.log(result);
                 
            });
	 }
 	 else{
	  console.log("you are not an admin, you can not perform this Operation.");
		res.send("you are not an admin, you can not perform this Operation.");
 		}

};//end of deleteTaskLayer


