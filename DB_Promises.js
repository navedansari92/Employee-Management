const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID; 
class Database{
	constructor(url){
		function connect(){
			return new Promise((resolve,reject)=>{
				MongoClient.connect(url).then(con=>resolve(con)).catch(err=>reject(err))
			})
		}

		this.read=function(readParams){
			return new Promise((resolve,reject)=>{
				connect().then(conn=>{
					const db=conn.db(readParams.db);
					const collection=db.collection(readParams.collection);
					collection.find(readParams.criteria).project(readParams.projection).toArray().then(docs=>resolve(docs)).catch(err=>reject(err))
				}).catch(err=>reject(err))
			})
		}

		this.add=function(addParams){
			return new Promise((resolve,reject)=>{
				connect().then(conn=>{
					const db=conn.db(addParams.db)
					const collection=db.collection(addParams.collection);
					collection.insertOne(addParams.payLoad).then(result=>resolve(result)).catch(err=>reject(err));
				}).catch(err=>reject(err))
			})
		}

		this.update=function(updateParams){
			return new Promise((resolve,reject)=>{
				connect().then(conn=>{
					const db=conn.db(updateParams.db)
					const collection=db.collection(updateParams.collection);
					collection.updateOne({"_id":new ObjectID(updateParams.criteria)},{$set: updateParams.payLoad}).then(result=>resolve(result)).catch(err=>reject(err));
				}).catch(err=>reject(err))
			})
		}

		this.delete=function(deleteParams){
			return new Promise((resolve,reject)=>{
				connect().then(conn=>{
					const db=conn.db(deleteParams.db)
					const collection=db.collection(deleteParams.collection);
					collection.deleteOne({"_id":new ObjectID(deleteParams.criteria)}).then(result=>resolve(result)).catch(err=>reject(err));
				}).catch(err=>reject(err))
			})
		}
	}
}

module.exports=Database;