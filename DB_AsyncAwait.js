const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID; 
class Database{
	constructor(url){
		async function connect(){
			try{
				const con=await MongoClient.connect("mongodb://localhost:27017")
				return con;
			}catch(err){
				throw err;
			}
		}

		this.read=async function(readParams){
			try{
				console.log(`ReadParams ------------- ${JSON.stringify(readParams)}`);
				const conn=await connect();
				const db=conn.db("employees")
				const collection=db.collection(readParams.collection)
				const docs=await collection.find(readParams.criteria).project(readParams.projection).toArray();
				return docs;
			}catch(err){
				throw err;
			}
		}

		this.add=async function(addParams){
			try{
				console.log(addParams);
				const conn=await connect();
				const db=conn.db("employees");
				const collection=db.collection(addParams.collection);
				const result=await collection.insertOne(addParams.payLoad);
				return result;
			}catch(err){throw err}
		}

		this.update=async function(updateParams){
			try{
				console.log(updateParams);
				const conn=await connect();
				const db=conn.db("employees");
				const collection=db.collection(updateParams.collection);
				const result=await collection.updateOne({"_id":new ObjectID(updateParams.criteria)},{$set : updateParams.payLoad})
				return result;
			}catch(err){
				//console.log(`${err} while updating`)
				throw err
			}
		}

		this.delete=async function(deleteParams){
			try{
				console.log(deleteParams);
				const conn=await connect()
				const db=conn.db("employees");
				const collection=db.collection(deleteParams.collection);
				const result=await collection.deleteOne({"_id":new ObjectID(deleteParams.criteria)});
				return result;
			}catch(err){
				throw err
			}
		}

		this.showByName=async function(dataCriteria){
			try {
				// statements
				console.log(dataCriteria)
				const conn=await connect()
				const db=conn.db("employees");
				const collection=db.collection(dataCriteria.collection)
				const records=collection.find(dataCriteria.criteria).project(dataCriteria.projection).toArray();
				return records
			} catch(e) {
				// statements
				console.log(e);
				throw e;
			}
		}
	}
}
module.exports=Database