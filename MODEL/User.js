const {hash,compare} = require("bcryptjs");
const {executeSQL} = require("../db/db");
const uniqid = require('uniqid');
const {spaceOBJ,planet,getAstrList} = require('./SpaceObj');
const news = require('../MODEL/News');


class User{
    constructor(UserName,type,sessionID,lastUsedTime){
        
        this.UserName = UserName;
        var userType = type;

        if(sessionID){
            this.sessionID = sessionID;
        }
        else{
            this.sessionID = uniqid();
        }
        if(lastUsedTime){
            this.lastUsedTime = lastUsedTime;
        }
        else{
            this.lastUsedTime = Number(new Date().getTime());
        }
    }

    async setLastUsedTime(){

        this.lastUsedTime = Number(new Date().getTime());
        try{
            await executeSQL(`UPDATE session_table SET lu_time= ? WHERE username = ?`,[Number(this.lastUsedTime),this.UserName]);
        }catch(e){
            console.log("Error");
        }
        
    }
    
    async changePass(CurrPassword,NewPassword){
        
        
        var credential,hashedPass,success;

        try{
            
            credential = await executeSQL(`SELECT username,password FROM user_table WHERE username = ?`,[this.UserName]); 
            hashedPass = credential[0].password;
            success = await compare(CurrPassword,hashedPass); 
        }
        catch(e){
            return ("Error");
        }   
        
        if(success){
            try{
                
                const hashedPassword = await hash(NewPassword,10);
                await executeSQL(`UPDATE user_table SET password = ? WHERE username = ?`,[hashedPassword,this.UserName]); 
                    
                return ("Password Changed");
               
            }catch(e){
                return(e);
            }   
        }else{
            return("Error");
        }
                
        
    }

    async getAstrObj(tag){

        var astrObj = new spaceOBJ();
        const status = await astrObj.setDataByDB(tag);

        if (status != "Error"){
            return(astrObj);
        }else{
            return("Error");
        }
    }

    async getPlanet(tag){

        var pnet = new planet();

        const status = await pnet.setDataByDB(tag);

        if (status != "Error"){
            return(pnet);
        }else{
            return("Error");
        }
    }

    async getObjList(count,tbName){

        return(await getAstrList(count,tbName));
        
    }

    async getNewsList(count){

        var data = new news();

        return(await data.getNewsList(count));

    }

    async getNews(id){

        var data = new news();

        return(await data.getNews(id));

    }

    async addComment(id,comment){

        var data = new news();

        return(await data.addComment(id,comment,this.UserName));
    }

    async getComment(id){

        var data = new news();

        return(await data.getComment(id));
    }

   
}



class AdminUser extends User{
    constructor(UserName,type){
        super(UserName,type);        
    }

    AddAstrObj(tag,image,description){
        var astrObj = new spaceOBJ(tag,image,description);

        console.log(astrObj);
        return(astrObj.insertToDB());
    }

    async EditAstrObj(tag,image,description){

        var astrObj = new spaceOBJ();
        await astrObj.setDataByDB(tag);

        return(astrObj.editDataFFO(image,description));

    }

    async EditPlanet(tag,image,description){

        var pnet = new planet();

        await pnet.setDataByDB(tag);

        return(pnet.editDataFFO(image,description));

    }

    

    async AddNews(description,username){

        var data = new news(username);

        return(await data.setNews(description));


    }

    async EditNews(news_id,description,username){
        
        var data = new news();

        return(await data.editNews(news_id,description,username));
    }


}

module.exports = {User,AdminUser};