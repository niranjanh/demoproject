
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

app.post('/deleteArchitect', function(req, res){ 

     dbobj = db1.db("architects");
     

     var id = req.body.id;
     var nameA = req.body.name; 

     /* dbobj.collection("serviceProvides").find({$and : [{"name":nameSP},{"id" : id}]}).toArray(
		     function(err, result){ 
	    		if (err) throw err;
         
		*/
            //if(result.body.name)
            //{
                //console.log("found");
                dbobj.collection("architectsTable").deleteOne({$and : [{"name":nameA},{"id" : id}]},
                    function(err,obj){
                if(err) {
                    throw err;
                }

                //res.send("Foloowing record is deleted.....\n")
        
                 res.send(obj);
                
                
                /* else
                    {console.log("not found");
                    res.send("not Found");}
                    */
            });
            //}
            //else
             //   {
                    
             //   }
                
               
            
  		//});

});

app.listen(10000);















