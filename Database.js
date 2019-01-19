const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID; 
class Database{
	constructor(url){
		function connect(callback){
			const mongoClient=new MongoClient(url);
			mongoClient.connect((err,conn)=>{
				if(err){
					console.log(`error in connection ${err}`)
					//callback(err)
				}else{
					callback(conn)
				}
			})
		}

		this.read=function(readParams){
			//console.log(readParams.projection);
			connect(conn=>{
				const database=conn.db(readParams.db);
				const collection=database.collection(readParams.collection);
				collection.find(readParams.criteria).project(readParams.projection).toArray((err,docs)=>{
					if(err){
						console.log(`error in read ${err}`);
						//readParams.callback(err);
					}else{
						readParams.callback(docs);
					}
				})
			})
		}

		this.add=function(addParam){
			//console.log("Addparams "+addParam);
			connect(conn=>{
				const database=conn.db(addParam.db);
				const collection=database.collection(addParam.collection);
				collection.insertOne(addParam.payLoad,(err,res)=>{
					if(err){
						console.log(`error in insert ${err}`);
						//readParams.callback(err);
					}else{
						addParam.callback(res);
					}
				})	
			})
		}

		this.update=function(uploadParams){
			console.log(JSON.stringify(uploadParams));
			connect(conn=>{
				const database=conn.db(uploadParams.db);
				const collection=database.collection(uploadParams.collection);
				collection.updateOne({"_id":new ObjectID(uploadParams.criteria)},{$set : uploadParams.payLoad},(err,res)=>{
					if(err){
						console.log(`error in update ${err}`);
						//readParams.callback(err);
					}else{
						uploadParams.callback(res);
					}
				})	
			})	
		}

		this.delete=function(deleteParams){
			console.log(JSON.stringify(deleteParams));
			connect(conn=>{
				const database=conn.db(deleteParams.db);
				const collection=database.collection(deleteParams.collection);
				collection.deleteOne({"_id":new ObjectID(deleteParams.criteria)},(err,res)=>{
					if(err){
						console.log(`error in update ${err}`);
						//readParams.callback(err);
					}else{
						deleteParams.callback(res);
					}
				})	
			})	
		}
	}
}

module.exports=Database