const router=require("express").Router();
const arrayOfEmployee=[{"name":"John","age":35},{"name":"Alex","age":30},{"name":"Mark","age":25}]
const DB=require("./Database");
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const url="mongodb://localhost:27017/"
const dbName="employees";

class EmployeeRouter{

	static get(){

		router.get("/",(req,res)=>{
			//const client=new MongoClient(url);

			//New approach using call backs, but still not recommended due to callback hell.
			new DB(url).read({
				db:dbName,
				collection:"employeedetails",
				criteria:{"name":"Daniel"},
				projection:{_id:0},
				callback:docs=>{
					res.status(200).send(docs);
				}
			})

			//Old way which is not recommended
			// client.connect((err,connection)=>{
			// 	if(!err){
			// 		console.log("Connected to mongo");
			// 		const db=connection.db(dbName);
			// 		const collection=db.collection("employeedetails");
			// 		collection.find({age:{$gt:20}}).toArray((err,docs)=>{
			// 			if(!err){
			// 				// console.log(docs);
			// 				res.status(200).send(docs)
			// 			}else{
			// 				res.status(500).send(`Error while fetching data${err.stack}`)
			// 			}
			// 		})
			// 	}else{
			// 		console.log(`Error while connecting with mongo ${err.stack}`);
			// 		res.status(500).send(`Error while connecting with mongo ${err.stack}`)
			// 	}
			// })
		})

		router.post("/",(req,res)=>{
			//arrayOfEmployee.push(req.body);
			// console.log(req.query);
			// console.log(req.params);
			console.log(req.body);
			new DB(url).add({
				db:dbName,
				collection:"employeedetails",
				payLoad:req.body,
				callback:result=>{
					res.status(200).send(result);
				}
			})
		})

		router.put("/",(req,res)=>{
			console.log(req.body);
			new DB(url).update({
				db:dbName,
				collection:"employeedetails",
				criteria:req.body.id,
				payLoad:req.body.payLoad,
				callback:result=>{
					res.status(200).send(result);
				}
			})
		})

		router.delete("/",(req,res)=>{
			new DB(url).delete({
				db:dbName,
				collection:"employeedetails",
				criteria:req.body.id,
				callback:result=>{
					res.status(200).send(result);
				}
			})
			//res.status(200).send("deleting from array");
		})

		return router;
	}
}

module.exports=EmployeeRouter;