var express = require('express');
var router = express.Router();

const {login,signup} = require("../MODEL/Authentication");
const {ResponseHandler} = require("../Controller/ResponseController");
const Method = require("../Controller/method");


router.post('/login',async function(req, res){

    var method = new Method(req,res);
    
    var status = await login(method);

    res.status(ResponseHandler(status)).send(status);

});

router.post('/signup',async function(req, res){

    var method = new Method(req,res);
    
    const status = await signup(method);
    
    res.status(ResponseHandler(status)).send(status);

});





module.exports = router;










