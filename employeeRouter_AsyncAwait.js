const router = require("express").Router();
const DB = require("./DB_AsyncAwait");
const DBP = require("./DB_Promises");
const url = "mongodb://localhost:27017/"
const dbName = "employees";
const AJV = require("ajv")
const AJVValidator = new AJV()
const validateAddEmployee = require("./EmployeeSchema").postSchema;
const validateUpdateEmployee = require("./EmployeeSchema").putSchema;
const EmployeeHandler= require("./EmployeeHandler");
class EmployeeRouter {
    static get() {
        router.get("/", async (req, res) => {
            try {
                const docs = await new DB(url).read({
                    db: dbName,
                    collection: "employeedetails",
                    criteria: { "name": "Martin" },
                    projection: { _id: 0 }
                })
                res.status(200).send(doc)
            } catch (err) {
                res.status(500).send(`${err.message}-${err.stack}`)
            }
        })

        router.post("/", async (req, res) => {
            try {
                if (AJVValidator.validate(validateAddEmployee,req.body)) {
                    const result = await new DB(url).add({
                        db: dbName,
                        collection: "employeedetails",
                        payLoad: req.body
                    })
                    res.status(200).send(result);
                }else{
                	//console.log(`${JSON.stringify(AJVValidator.errors,null,2)}`)
                	const errors = AJVValidator.errors
                	res.status(500).send(errors)
                }
            } catch (err) {
            	console.log(err.message)
                res.status(500).send(err.message);
            }
        })

        router.put("/", async (req, res) => {
            try {
            	if (AJVValidator.validate(validateUpdateEmployee,req.body)) {
	                const result = await new DB(url).update({
	                    db: dbName,
	                    collection: "employeedetails",
	                    criteria: req.body.criteria,
	                    payLoad: req.body.payLoad
	                })
                    require("./LokiHandler").update({})
	                res.status(200).send(result)
	            }else{
	            	const error=AJVValidator.errors;
	            	res.status(500).send(error);
	            }
            } catch (err) {
                res.status(500).send(err)
            }
        })
        router.put("/lokiput", async (req, res) => {
            try {
                    const result  = require("./LokiCache").update({})
                    res.status(200).send(result)
            } catch (err) {
                console.log(`${err.message} -  ${err.stack}`)
                res.status(500).send(err.message)
            }
        })

        router.delete("/", async (req, res) => {
            try {
                const result = await new DB(url).delete({
                    db: dbName,
                    collection: "employeedetails",
                    criteria: req.body.criteria,
                })
                res.status(200).send(result)
            } catch (err) {
                res.status(500).send(err)
            }
        })

        router.get("/get", async (req, res) => {
            try {
                const docs = await new DBP(url).read({
                    db: dbName,
                    collection: "employeedetails",
                    criteria: {},
                    projection: { "_id": 0 }
                })
                res.status(200).send(docs)
            } catch (err) {
                res.status(500).send()
            }
        })

        router.post("/new",async(req,res)=>{
        	try{
        		const result = await EmployeeHandler.create(req.body);
        		res.status(200).send(result);
        	}catch(err){
        		console.log(err.stack)
                res.status(500).send(err.message);
        	}
        	/*try {
                if (AJVValidator.validate(validateAddEmployee,req.body)) {
                    const result = await new DB(url).add({
                        db: dbName,
                        collection: "employeedetails",
                        payLoad: req.body
                    })
                    res.status(200).send(result);
                }else{
                	//console.log(`${JSON.stringify(AJVValidator.errors,null,2)}`)
                	const errors = AJVValidator.errors
                	res.status(500).send(errors)
                }
            } catch (err) {
            	console.log(err.message)
                res.status(500).send(err.message);
            }*/
        })

        router.put("/newUpdate",async (req,res)=>{
            try {
                // statements
                const updateResult=await EmployeeHandler.update(req.body)
                Lok
                res.status(200).send(updateResult);
            } catch(e) {
                // statements
                console.log(e);
                res.status(500).send(e.message);
            }
        })

        router.delete("/newDelete",async (req,res)=>{
            try {
                // statements
                const deleteResult=await EmployeeHandler.delete(req.body)
                res.status(200).send(deleteResult)
            } catch(e) {
                // statements
                console.log(e);
                res.status(500).send(e.message)
            }
        })

        router.get("/byName",async (req,res)=>{
            try {
                // statements
                const records=await EmployeeHandler.getByName(req.query);
                res.status(200).send(records)
            } catch(e) {
                // statements
                console.log(e);
                res.status(500).send(e.message)
            }
        })

        router.get("/getLokiData",(req,res)=>{
            const data=require("./LokiHandler").getDataFromLoki()
            res.send(JSON.stringify(data,null,2));
        })
        return router;
    }
}
module.exports = EmployeeRouter;