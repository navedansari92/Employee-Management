const ValidateFactory=require("./ValidateFactory");
const Database = require("./DB_AsyncAwait")
const EMPLOYEE_POST_SCHEMA="employeePostSchema";
const EMPLOYEE_PUT_SCHEMA="employeePutSchema";
const EMPLOYEE_DELETE_SCHEMA="employeeDeleteSchema";
const EMPLOYEE_NAME_SCHEMA="employeeNameSchema";

class EmployeeHandler{
	static async create(employee){
		try{
			ValidateFactory.validate(EMPLOYEE_POST_SCHEMA,employee)
			return await new Employee().create(employee)
		}catch(err){
			throw err;
		}
	}

	static async update(updateEmployee){
		try {
			// statements
			ValidateFactory.validate(EMPLOYEE_PUT_SCHEMA,updateEmployee)
			return await new Employee().update(updateEmployee)
		} catch(e) {
			// statements
			console.log(e);
			throw e;
		}
	}

	static async delete(deleteEmployee){
		try {
			// statements
			ValidateFactory.validate(EMPLOYEE_DELETE_SCHEMA,deleteEmployee)
			return await new Employee().delete(deleteEmployee);
		} catch(e) {
			// statements
			console.log(e);
			throw e;
		}
	}

	static async getByName(criteria){
		try {
			// statements
			ValidateFactory.validate(EMPLOYEE_NAME_SCHEMA,criteria)
			return await new Employee().getByName(criteria);
		} catch(e) {
			// statements
			console.log(e);
			throw e
		}
	}

	static async getAllEmployeeData(){
		try{
			return await new Employee().showAll();
		}catch(e){
			console.log(e)
			throw e
		}
	}
}

class Employee{
	constructor(){
		this.collection="employeedetails"
		this.db=new Database()
	}
	async create(employee){
		try {
			return await this.db.add({"collection":this.collection,"payLoad":employee})
		} catch(e) {
			// statements
			throw e;
		}
	}

	async update(updateEmployee){
		try {
			// statements
			return await this.db.update({"collection":this.collection,"criteria":updateEmployee.criteria,"payLoad":updateEmployee.payLoad})
		} catch(e) {
			// statements
			console.log(e);
			throw e
		}
	}

	async delete(deleteEmployee){
		try {
			// statements
			return await this.db.delete({"collection":this.collection,"criteria":deleteEmployee.id})
		} catch(e) {
			// statements
			console.log(e);
			throw e;
		}
	}

	async getByName(criteria){
		try {
			// statements
			return await this.db.showByName({"collection":this.collection,"criteria":criteria})
		} catch(e) {
			// statements
			console.log(e);
			throw e;
		}
	}

	async showAll(){
		try {
			// statements
			return await this.db.read({"collection":this.collection,"criteria":{},"projection":{}});
		} catch(e) {
			// statements
			console.log(e);
			throw e
		}
	}
}

module.exports=EmployeeHandler