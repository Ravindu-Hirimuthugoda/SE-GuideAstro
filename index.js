var express = require('express');
const dotenv = require('dotenv');

var apiController = require("./RouteFacade/APIController");
var authController = require("./RouteFacade/authController");

var {RestoreSession} = require("./MODEL/Authentication");

var app = express();
dotenv.config();

RestoreSession();

app.use('/api',apiController);
app.use('/auth',authController);

app.listen(process.env.port);



