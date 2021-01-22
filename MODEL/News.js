const {executeSQL} = require("../db/db");

class news{

    constructor(username){
        if (username){
            this.creator = username;
        }
    }

    async setNews(description){
        try{
            await executeSQL('INSERT INTO news (description,creator,last_editor) VALUES (?,?,?)',[description,this.creator,this.creator]);
            return("News successfully added to the DB");
        }catch(e){
            return("Error");
        }
        

    }

    async editNews(news_id,description,username){
        try{
            await executeSQL(`UPDATE news SET description = ?, last_editor = ? WHERE news_id = ?`,[description,username,news_id]);
            return("Successfully edited the DB");
        }catch(e){
            return("Error");
        }
        
    }

    async getNewsList(count){
        try{
            const data = await executeSQL(`SELECT * FROM news LIMIT ${count}`);
            return(data);
        }catch(e){
            return("Error");
        }
    }

    async getNews(id){
        try{
            const data = await executeSQL(`SELECT * FROM news WHERE news_id = ?`,[id]);
            return(data);
        }catch(e){
            return("Error");
        }
    }

    async addComment(id,comment,username){

        try{
            const data = await executeSQL(`SELECT * FROM news WHERE news_id = ?`,[id]);

            if (data[0]){
                await executeSQL(`INSERT INTO news_comment (news_id,username,comment) VALUES (?,?,?)`,[id,comment,username]);
                return("Comment successfully added to the DB");
            }else{
                return("Error");
            }
            
        }catch(e){
            return("Error");
        }
    }

    async getComment(id){

        try{
            const data = await executeSQL(`SELECT * FROM news_comment WHERE news_id =?`,[id]);

            if(data[0]){
                return(data);
            }else{
                return("Error");
            }
        }catch(e){
            return("Error");
        }

        
    }


}


module.exports = news;