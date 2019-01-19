const loki=require("lokijs");
const EmployeeHandler=require("./EmployeeHandler");
const LokiCache=require("./LokiCache");
class LokiHandler{
	static async loadStartUpData(){
		try {
			// statements
			const allData=await EmployeeHandler.getAllEmployeeData();
			LokiCache.load({
				"data":allData,
				"collection":"employeedetails"
			})
			//console.log(`All data from mongo ${JSON.stringify(allData)}`);
		} catch(e) {
			// statements
			console.log(`${e.message} - ${e.stack}`);
			throw e
		}
	}

	static getDataFromLoki(){
		return LokiCache.get({"collection":"employeedetails","criteria":{},"projection":{}});
	}
}

module.exports=LokiHandler;