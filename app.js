(async function(){
try{
	const express=require("express")
const EmployeeRouter=require("./employeeRouter");
const EmployeeRouter_Promises=require("./employeeRouter_Promises");
const EmployeeRouter_AsyncAwait=require("./employeeRouter_AsyncAwait");
const bodyParser = require('body-parser');
const LokiHandler=require("./LokiHandler");
const app=express()
await LokiHandler.loadStartUpData();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/employee",EmployeeRouter.get())
app.use("/employee_promises",EmployeeRouter_Promises.get())
app.use("/employee_async",EmployeeRouter_AsyncAwait.get())

//const arrayOfEmployee=[{"name":"John","age":35},{"name":"Alex","age":30},{"name":"Mark","age":25}]

app.listen(3000)
console.log(`Server started`)
}catch(e){
	console.log(`${e.message} - ${e.stack}`)
}
})()
