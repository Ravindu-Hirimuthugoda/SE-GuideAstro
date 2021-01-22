var express = require('express');
var router = express.Router();

const UserController = require("../Controller/UserController");
const Method = require("../Controller/method");
const {ExtractUser,logout} = require("../MODEL/Authentication");
const {ResponseHandler} = require("../Controller/ResponseController");

var uController = new UserController();

router.use(ExtractUser)


////////////////////////////////////////////////////// GET Requests

router.get('/getAstrObj',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getAstrObj(method,req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

router.get('/getPlanet',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getPlanet(method,req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

router.get('/getAstrList',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getAstrList(method,req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});


router.get('/getNewsList',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getNewsList(method,req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

router.get('/getNews',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getNews(method,req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

router.get('/getComment',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getComment(method,req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

////////////////////////////////////////////////////// POST Requests



router.post('/changepass',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.changePass(method,req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

router.post('/AddAstrObj',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.AddAstrObj(method,req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

router.post('/AddNews',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.AddNews(method,req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

router.post('/addComment',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.addComment(method,req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});


////////////////////////////////////////////////////// UPDATE Requests

router.put('/EditAstrObj',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.EditAstrObj(method,req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

router.put('/EditPlanet',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.EditPlanet(method,req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

router.put('/EditNews',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.EditNews(method,req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

////////////////////////////////////////////////////// DELETE Requests

router.delete('/logout',async function(req, res){
    
    var method = new Method(req,res);
    
    const status = await logout(req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);
    

});


module.exports = router;