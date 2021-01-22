const {executeSQL} = require("../db/db");

class spaceOBJ{
    
    constructor(tag,image,description){
        if (tag){
            this.tag = tag;
        }else{
            this.tag = null;
        }

        if (image){
            this.image = image;
        }else{
            this.image = null;
        }
        
        if (description){
            this.description = description;
        }else{
            this.description = null;
        }

        this.tableName = "astronomical_object";

        
    }

    async setDataByDB(tag){

        try{
            const data = await executeSQL(`SELECT image, description FROM ${this.tableName} WHERE name = ?`,[tag]);

            this.tag = tag;
            this.image = data[0].image;
            this.description = data[0].description;

            return("Database Read done");

        }catch(e){

            return("Error");
        
        }
        
            
    }

    async insertToDB(){

        if (this.tag != null){

            try{
                
                const status = await executeSQL(`SELECT name FROM ${this.tableName} WHERE name = ?`,[this.tag]);
            
                if (status.length>0){
                    return("Error");
                }else{
                    
                    try{
                        await executeSQL(`INSERT INTO ${this.tableName} VALUES (?,?,?)`,[this.tag,this.image,this.description]);
                        return("Data successfully added to the DB");
                    }catch(e){
                        return("Error");
                    }
               
                }
            }catch(e){
                return("Error");
            }
  
        }
    }

    async editDataFFO(image,description){

        if(image){
            this.image = image;
        }

        if(description){
            this.description = description;
        }

        try{
            await executeSQL(`UPDATE ${this.tableName} SET image = ?, description = ? WHERE name = ?`,[this.image,this.description,this.tag]);
            return("Successfully Updated");
        }catch(e){
            return("Error");
        }

    }

    setTableName(){
        this.tableName = "planet" ;
    }

}

class planet extends spaceOBJ{
    constructor(tag,image,description){
        super(tag,image,description);
        this.distance = null;
        this.setTableName();
    }

    async getDistance(){

        try{
            const data = await executeSQL(`SELECT distance FROM planet WHERE name = ?`,[this.tag]);
            this.distance = data[0].distance;
            return(this.distance);
        }catch(e){
            return("Error");
        }
        
    }
}


async function getAstrList(count,tbName){
    try{
        console.log(`SELECT * FROM ${tbName} LIMIT ${count}`);
        const data = await executeSQL(`SELECT * FROM ${tbName} LIMIT ${count}`);
        return(data);
    }catch(e){
        return("Error");
    }
} 


module.exports = {spaceOBJ,planet,getAstrList};