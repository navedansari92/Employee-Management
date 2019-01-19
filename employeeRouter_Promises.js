const router=require("express").Router();
const DB=require("./DB_Promises");
const url="mongodb://localhost:27017/"
const dbName="employees";

class EmployeeRouter{
	static get(){
		router.get("/",(req,res)=>{
			new DB(url).read({
				db:dbName,
				collection:"employeedetails",
				criteria:{name:"Yarn"},
				projection:{_id:0}
			}).then(docs=>res.send(docs)).catch(err=>res.status(500).send(err))
		})

		router.post("/",(req,res)=>{
			console.log(req.body);
			new DB(url).add({
				db:dbName,
				collection:"employeedetails",
				payLoad:req.body
			}).then(result=>res.send(result)).catch(err=>res.status(500).send(err))
		})

		router.put("/",(req,res)=>{
			console.log(req.body)
			new DB(url).update({
				db:dbName,
				criteria:req.body.id,
				collection:"employeedetails",
				payLoad:req.body.payLoad
			}).then(result=>res.send(result)).catch(err=>res.status(500).send(err))
			//res.status(200).send("update an array")
		})

		router.delete("/",(req,res)=>{
			console.log(req.body)
			new DB(url).delete({
				db:dbName,
				criteria:req.body.id,
				collection:"employeedetails",
			}).then(result=>res.send(result)).catch(err=>res.status(500).send(err))
		})
		return router;
	}
}

module.exports=EmployeeRouter;