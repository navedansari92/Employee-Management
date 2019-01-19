const loki = require("lokijs")
const inMemoryDB = new loki('loki.json',{"env":"NODEJS","verbose":true})
class LokiCache{
    static load(loadParams){
        const collection = inMemoryDB.addCollection(loadParams.collection)
        collection.insert(loadParams.data)
    }
    static get(readParams){
        const collection = inMemoryDB.getCollection(readParams.collection)
        let documents = collection.find(readParams.criteria)
        if(readParams.projection && readParams.projection.length>0){
            documents = documents.map(document=>{
                const newDoc = {}
                for (let key in readParams.projection){
                    if(readParams.projection[key] === 1)
                        newDoc[key] = document[key]
                }
                return newDoc
            })
        }else{
            return documents;
        }
        return documents
    }

    static update(updateParams){
        
        const collection = inMemoryDB.getCollection("employeedetails")
        collection.updateWhere(item=> { if( item.name === "Thor")
                            return true
                            else
                                return false
            },item=>{
                item.name = "Thora"
            })
        const docs = LokiCache.getDocument({collection:"employeedetails","criteria":{"name":"Thora"},"projection":{}})
        console.log(`docs is ${JSON.stringify(docs,null,2)}`)
        return "done"
    }

    static getDocument(readOneParams){
        const documents = LokiCache.get(readOneParams)
        return documents[0]
    }
    static drain(targetCollection){
        const collection = inMemoryDB.getCollection(targetCollection)
        collection.clear()
    }
}
module.exports = LokiCache