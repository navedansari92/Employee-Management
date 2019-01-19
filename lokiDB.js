const loki=require("lokijs");
const db=new loki("employees.json");
const Database=require("./DB_AsyncAwait");
class LokiDB{
	constructor(){
		try{
			this.collection="employeedetails"
			this.database=new Database();
			if(!db.getCollection("employeedetails")){
				const collection=db.addCollection("employeedetails");
				return collection;
			}
		}catch(err){
			throw err
		}
	}

	load(){
		try {
				// statements
				const ldb=new LokiDB();

				ldb.insert();
			} catch(e) {
				// statements
				console.log(e);
			}	
	}

	read(){

	}

	insert(){

	}

	update(){

	}
}