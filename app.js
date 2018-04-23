/*

DemoProject

###########  admin

_id
name
password


db.admins.insertMany([{id:1, 'name' : 'niranjan', 'password' : '12345678' },{id:2, 'name' : 'rahul'   , 'password' : '12345678' },{id:3, 'name' : 'anant'   , 'password' : '12345678' },{id:4, 'name' : 'ajinkya' , 'password' : '12345678' },{id:5, 'name' : 'nihal'   , 'password' : '12345678' }])




####     serviceProvides

_id
name
task
start_date
end_date
task
task_status
password
image


#######  architects

db.serviceProvides.insertMany([{id:1, 'name' : 'sp1','task': ' ' , 'startDate' : ' ', 'endDate' : ' '},{id:2, 'name' : 'sp2','task': ' ' , 'start_date' : ' ', 'end_date' : ' '},{id:3, 'name' : 'sp3','task': ' ' , 'start_date' : ' ', 'end_date' : ' '},{id:4, 'name' : 'sp4','task': ' ' , 'start_date' : ' ', 'end_date' : ' '}])
*/

var mongo = require('mongodb');

var event = require("events");
var eventEmitter = new event.EventEmitter();


const yargs = require("yargs");

var express = require('express');
var app = express();
var http = require('http');
var bp = require("body-parser");
var cookieParser = require('cookie-parser')



app.use(bp.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(bp.json());
app.use((req,res,next)=>{
	//req.cookies
	next();
}); 	 	

var url = "mongodb://localhost:27017/DemoProject";


var db1;
var dbobj;

mongo.connect(url, function (err, db) {

	if (err) throw err;

	console.log("success");

	db1 = db;

});

app.use('/login', function (req, res, next) {

	var usr = req.body.username;
	var pwd = req.body.password;
	var role = req.body.role;

	var query = { name: usr };

	dbobj = db1.db("DemoProject");

	dbobj.collection(role).find(query).toArray(function (err, result) {

		if (err) throw err;

		var dbusr = result[0].name;

		var dbpwd = result[0].password;


		if (usr === dbusr && pwd === dbpwd) {
			res.send('hello');    //return res.redirect('/second.html');
			next();
		}
		else {
			console.l
og("invalid password/username");

		}

	});


})



/*
var checkLogin = function (usr, pwd, role) {
	return new Promise((resolve, reject) => {
		var flag;
		console.log(usr);
		console.log(pwd);
		console.log(role);
		var query = { name: usr };

		dbobj = db1.db("DemoProject");
		//console.log(1);

		return dbobj.collection(role).find(query).toArray(function (err, result) {

			if (err) {
				console.log(err);
				return reject(err);
			};

			var dbusr = result[0].name;
			//console.log(dbusr);

			var dbpwd = result[0].password;
			//console.log(dbpwd);
			//console.log(flag);

			if (usr === dbusr && pwd === dbpwd) {
				flag = true;
			}
			else {
				flag = false;
			}
			
			//console.log(flag);
			resolve(flag);
		});
	})

}


	var loginMiddleware = function (req, res, next) {

	var usr = req.body.username;
	var pwd = req.body.password;
	var role = req.body.role;

	var reslt = checkLogin(usr, pwd, role).then((flag) => {   //auth
		
		if (reslt) {
			//res.send('hello');    //return res.redirect('/second.html');
			next();
		}
		else {
			console.log("invalid password/username");
			res.send("invalid password/username");
		}
	}).catch((err) => {
		console.log(err);
		return res.status(500);
	})
}


app.use('/login', loginMiddleware, (req, res,next) => {
	console.log('ddddddddddddddddddddddddddddd');
	next();
})

*/
/*
app.use('/login/hi', function(req, res){
	console.log('hid');
	res.send("heyy");
})
*/







app.use(cookieParser())

















































//var getServiceProviders;
/*
app.post('/login',function(req, res){ 
	

   var usr = req.body.username; 
   var pwd = req.body.password;
   var role = req.body.role;
  
 //  console.log(usr);
// console.log(req.body);
	var flag  =0 ;

    dbobj = db1.db("DemoProject");
	//console.log("1");
	var query = { name : usr };
	
  //console.log(query);
	dbobj.collection(role).find(query).toArray(function(err, result) {
	//	console.log("2");
		if (err) throw err;
  //console.log(result);
	    var dbusr = result[0].name;
	//console.log("3");
        var dbpwd = result[0].password;
	    //db1.close();
		
	//	console.log(dbusr);
      	if(usr === dbusr && pwd ===  dbpwd)
	     {
			res.send('hello');    //return res.redirect('/second.html'); 
	     }
		else
		 {
	        console.log("invalid password/username");
	     }

	});

});
*/
app.listen(7000);











