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
	
	static updateDataInLoki(updateParams) {
        //console.log(`update params in Handler---------------${JSON.stringify(updateParams)}`)
        return LokiCache.update({
            collection: "employeedetails",
            filterFunction: item => {
                if (item._id == updateParams.criteria)
                    return true
                else
                    return false

            },
            updateFunction: item => {
                item.name = updateParams.payLoad.name;
                item.age = updateParams.payLoad.age;
                item.contact = updateParams.payLoad.contact;
                return item
            }
        });
    }
}

module.exports=LokiHandler;
