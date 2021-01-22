const {hash,compare} = require("bcryptjs");
const {executeSQL} = require("../db/db");
const {sign, verify} = require("jsonwebtoken");
const Method = require("../Controller/method");
const {User,AdminUser} = require("../MODEL/User");
const ACCESS_TOKEN_SECRECT = "SEGProject";

var users = new Map();

async function signup(method){

    var username = method.searchURL('username');
    var password = method.searchURL('password');
    var type     = method.searchURL('type');

    try{
        const data = await executeSQL('SELECT username FROM user_table WHERE username = ?',[username]);
        
        if(data[0]){

            return ("Error");
        
        }else{
            
            const hashedPassword = await hash(password,10);
            await executeSQL('INSERT INTO user_table SET ?',{username:username,password:hashedPassword,type:type});
            
            return ("User added");
        }

    }catch(e){
        
        return ("Error1");
        
    }   
}

async function login(method){

    var username = method.searchURL('username');
    var password = method.searchURL('password');

    const credential = await executeSQL('SELECT username , password, Type FROM user_table WHERE username =?',[username]);
    
    try{
        const status = await compare(password,credential[0].password);
        const type = credential[0].Type;
        
        if (status){

            var user = userCreator(username,type);

            if (users.has(username)){

                users.delete(username);

                await executeSQL('UPDATE session_table SET session_id = ?, lu_time=? WHERE username= ?',[user.sessionID,Number(new Date().getTime()),this.username]);
                
                console.log("User Already Exists, logging out previous users");

            }else{

                try{
                    await executeSQL('INSERT INTO session_table VALUES (?,?,?)',[user.UserName,user.sessionID,Number(new Date().getTime())]);
                }
                catch(e){
                    console.log("Error");
                }
            }
    
            users.set(username,user);
    
            const token = getAccessToken({sessionID:user.sessionID,UserName:user.UserName});
    
            method.setToken(token,true,50000000);

            console.log(username + " Successfully Logged In !!!");

            return ("Password Matches");

        }else{
            return("Error");
        }

    }catch(e){
        return("Error");
    }

    
    
}

async function logout(user){

    users.delete(user.UserName);

    try{
        await executeSQL('DELETE FROM session_table WHERE username= ?',[user.UserName]);
    }
    catch(e){
        console.log("database error");
    }
    
    return(user.UserName + " Successfully Logged Out !!!")

}



const getAccessToken = (data)=>{
    token = sign(data, ACCESS_TOKEN_SECRECT,{expiresIn:"500m"});
    return token;
};



var ExtractUser =async function(req,res, next){

    var method = new Method(req,res);

    var token = method.getToken();

    try{
        const {sessionID,UserName} = verify(token,ACCESS_TOKEN_SECRECT);

        if(sessionID){
            
            var user = users.get(UserName);
            await user.setLastUsedTime();
            req.user = user;
        }

        next();
    }
    catch(err){
        console.log("Invaild token"); //when token expires
        res.sendStatus(203);
    }

    
    
}


var RestoreSession = async function(){

    console.log("Restoring Sessions");

    var data = null;

    try{
        data = await executeSQL('SELECT * FROM session_table LEFT JOIN User_table on session_table.username = user_table.username');
    }catch(e){
        console.log("error");
    }
   

    for (const [key, value] of data.entries()){

        var user = userCreator(value.username,value.Type,value.session_id,value.lu_time);
        users.set(value.username,user)
    
    }

    ShowCurrentUsers();
}


function userCreator(username,type,sessionID,lastUsedTime){
    if(type=="regular"){
        var user = new User(username,type,sessionID,lastUsedTime);
    }else if (type=="admin"){
        var user = new AdminUser(username,type,sessionID,lastUsedTime);
    }

    return(user)
}

function ShowCurrentUsers(){

    var CurrUsers = "Logged in: ";

    for (const [key, value] of users.entries()){
        CurrUsers = CurrUsers + value.UserName + "  " ;
    }

    if (CurrUsers=="Logged in: "){
        console.log("Nobody Logged in");
    }else{
        console.log(CurrUsers);
    }

    

}

module.exports = {login,signup,getAccessToken,ExtractUser,RestoreSession,logout,ShowCurrentUsers};


