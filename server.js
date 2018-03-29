var express = require('express');
var app = express();

var bodyParser = require("body-parser");
var id;
 var ObjectID = require('mongodb').ObjectID;
//STATIC FILES
app.use(express.static('public'));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Body parser use JSON data


var MongoClient = require('mongodb').MongoClient;
  
  var json1={};

// Connect to the db
MongoClient.connect('mongodb://localhost', function (err, client) {
  if (err) throw err;

  var db = client.db('prop');
  
  app.get('/', function (req, res) {
	res.sendFile( __dirname + "/" + "index.html" );
});

  app.get('/properties/list', function (req, res) {
	console.log("GET Request :: /list");
	var data = {
        "error": 1,
        "products": ""
    };
	
  db.collection('property', function (err, collection) {
        
         collection.find({"owner":"A"}).toArray(function(err, rows) {
            if(err) throw err;    
			if (rows.length !== 0 && !err) {
				json1["error"] = 0;
				data["products"] = rows;
				//console.log(rows);
				json1['owner']=rows;
				
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["products"] = 'No accounts Found..';
				res.json(data);
			} else {
				data["products"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
		//		log.error('Error while performing Query: ' + err);
			}
			collection.find({"status":"Intended For Sale","view_type":"Public"}).toArray(function(err,rows1){
				if(err) throw err;
				//console.log(rows1);
				json1["error"]=0;
				json1['status1']=rows1;
			
			collection.find({"status":"Intended For Sale","view_type":"Private","private":"A"}).toArray(function(err,rows1){
				if(err) throw err;
				//console.log(rows1);
				json1["error"]=0;
				json1['status2']=rows1;
			
			console.log(json1);
			res.json(json1);
        });
			});
	//  console.log(json1);
	  });
}); 
  });
  
  
  app.get('/properties/711/:_id', function (req, res) {
	var _id = req.params._id;
	  id=_id;
	var data = {
        "error": 1,
        "product": ""
	};
	console.log(_id);
  });

  
  
  
app.put('/properties/update', function (req, res) {

    var _id = req.body._id;
	var checkboxvalue1=req.body.checkboxvalue1;
	var checkboxvalue2=req.body.checkboxvalue2;
	var radiobuttonvalue=req.body.radiobuttonvalue;
	var privatenames=req.body.privatenames;
	var usernames=privatenames.split("\n");
    var data = {
        "error": 1,
        "product": ""
    };
	console.log(checkboxvalue1);
	console.log(checkboxvalue2);
	console.log(radiobuttonvalue);
	console.log("Private names"+privatenames);

	console.log(usernames);
		db.collection('property', function (err, collection) {
	
		console.log(id);
		if(checkboxvalue1==true){
			if(radiobuttonvalue=="Public"){
        collection.update({_id: ObjectID(id)}, { $set: {"status":"Intended For Sale","view_type":radiobuttonvalue} }, {w:1},
                                                     function(err, result){
                                                                if(err) throw err;  
																
                                                                console.log('Document Updated Successfully');
                                                        
												 });}
				if(radiobuttonvalue=="Private"){
        collection.update({_id: ObjectID(id)}, { $set: {"status":"Intended For Sale","view_type":radiobuttonvalue,"private":usernames} }, {w:1},
                                                     function(err, result){
                                                                if(err) throw err;  
																
                                                                console.log('Document Updated Successfully');
                                                        
												 });}
		}
		else if(checkboxvalue2==true){
        collection.update({_id: ObjectID(id)}, { $set: {"status":"Registered","view_type":"None"} }, {w:1},
                                                     function(err, result){
                                                                if(err) throw err;    
                                                                console.log('Document Updated Successfully');
                                                        
												 });}
		});

    
	db.collection('property',function(err,collection){
		collection.find({"owner":"A"}).toArray(function(err, rows) {
            if(err) throw err;    
			if (rows.length !== 0 && !err) {
				json1["error"] = 0;
				json1['owner']=rows;
			} else{
				//Error code 2 = no rows in db.
				json1["error"]=2;
				res.json(data);
			} 
			collection.find({"status":"Intended For Sale","view_type":"Public"}).toArray(function(err,rows1){
				if(err) throw err;
				//console.log(rows1);
				json1["error"]=0;
				json1['status']=rows1;
			
			collection.find({"status":"Intended For Sale","view_type":"Private","private":"A"}).toArray(function(err,rows1){
				if(err) throw err;
				//console.log(rows1);
				json1["error"]=0;
				json1['status2']=rows1;
			//console.log(json1);
			res.json(json1);
        });
	//	console.log("From Update Function HIIIII");
	  console.log(json1);
//	  console.log(json1['owner']);
			});
		});
	  });
});
});


var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("dummy app listening at: " + host + ":" + port);

});