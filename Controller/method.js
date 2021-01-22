const {URL}= require('url');
const Cookies = require("cookies");
const keys = ['SEngineering'];

const dotenv = require('dotenv');
dotenv.config();

class Method{ 
    constructor(req,res){
        this.req = req;
        this.res = res;
        this.type = req.method;
        this.url = new URL("http://localhost"+":"+ process.env.port +req.url);
        this.seperator = req.url.split(/[/,?]/);
        this.user=null;
    }
    getPath(ind){
        return this.seperator[ind];
    }

    searchURL(query){
        return this.url.searchParams.get(query);
    }
    getToken(){
        var cookies = new Cookies(this.req, this.res, { keys: keys });
        var token = cookies.get("JWToken",{signed:true});
        return token;
    }

    setToken(token,httpOnly,time){
        var cookies = new Cookies(this.req, this.res, { keys: keys });
        cookies.set('JWToken', token, { signed: true, maxAge:time,httpOnly:httpOnly});
    }

    setUser(user){
        this.user=user;
    }

   

}


 

module.exports = Method;