var mongo = require('mongodb');

var event = require("events");
var eventEmitter = new event.EventEmitter();

//res.cookie(cookie_name , 'cookie_value')
//res.cookie(name , 'value', {expire : new Date() + 9999});
/* app.get('/clearcookie', function(req,res){
     clearCookie('cookie_name');
     res.send('Cookie deleted');
}); */
//console.log("Cookies :  ", req.cookies);

const yargs = require("yargs");

var express = require('express');
var app = express();

var bp = require("body-parser");
var cookieParser = require('cookie-parser')

app.use(bp.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bp.json());
// app.use((req,res,next)=>{
// 	//req.cookies
// 	next();
// }); 	 	

var url = "mongodb://localhost:27017/DemoProject";


var db1;
var dbobj;
var flag;
var role;
var usr;
var pwd;
var tokenCookie;

mongo.connect(url, function (err, db) {

	if (err) throw err;

	console.log("success");

	db1 = db;

});

genRandomString = () => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var middleware = function(req,res,next){
	//console.log(req.cookies);
	//req.user = dbusr;
	
	next();
}


app.use(middleware);


//  @@@@@@@@@@@@@ LOGIN @@@@@@@@@@@@@@@@@@@@@@@@@@@//

app.post('/login', function (req, res) {

	usr = req.body.username;
	pwd = req.body.password;
	role = req.body.role;
    flag = 0;
	var query = { name: usr };
	//console.log(db1);
	
	dbobj = db1.db("DemoProject");

	dbobj.collection(role).find(query).toArray(function (err, result) {

		if (err) throw err;

		var dbusr = result[0].name;

		var dbpwd = result[0].password;


		if (usr === dbusr && pwd === dbpwd) {
			flag = 1;
			tokenCookie = genRandomString();
			console.log(tokenCookie);
			res.cookie('token',tokenCookie, { maxAge: 900000, httpOnly: true });
			
			res.send('hello');    //return res.redirect('/second.html');
			//console.log(req.cookies);
			// next();
		}
		else {
			console.log("invalid password/username");
		}
	
});
});

//  @@@@@@@@@@@@@ DELETE TASK  @@@@@@@@@@@@@@@@@@@@@@@@@@@// 
app.post('/deleteTask',(req,res,next)=>{
	console.log(tokenCookie);
	if(req.body.role === "admin" &&  tokenCookie  !== " "){
		next();
	}else{
		//res.status(401);
		 console.log("you are not an admin, you can not perform this Operation.");
		res.send("you are not an admin, you can not perform this Operation.");
	}
},function(req, res,next){ 

    dbobj = db1.db("DemoProject");
     
     var task = req.body.task;
    
     var myObj = { $set : {
         task : " ",
         task_status : " "
     }};

     dbobj.collection("serviceProvides").updateOne({"task":task},myObj,
                    function(err,result){
                
                        if(err)
                          throw err;

                 res.send(result);
                 
            });

});


//  @@@@@@@@@@@@@ ADD ARCHITECT @@@@@@@@@@@@@@@@@@@@@@@@@@@// 

app.post('/addArchitect', function(req, res){ 

	if(req.body.role === "admin" && tokenCookie !== " ")
		{
		var id = req.body.id;
		var nameA = req.body.name;
		var passwordA = req.body.password; 
		
		var myObj = {
			"id":id,
			"name":name,
			"passwordA" : password
		};
		
		
		dbobj.collection("architects").insertOne(myObj,
						function(err,result){
					
							if(err)
							throw err;

					res.send(result);
					
				});
		}
			else
				{
					res.send("you can not perform this operation. Sorry!!!");
					console.log("you can not perform this operation. Sorry!!!");
				}

});



//  @@@@@@@@@@@@@ LOGOUT @@@@@@@@@@@@@@@@@@@@@@@@@@@//

app.post('/logout',(req,res,next)=>{
     tokenCookie =" ";
     res.clearCookie("token");
     res.send('Cookie deleted');

});

app.listen(10000);
