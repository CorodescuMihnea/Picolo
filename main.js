"use strict";

console.log("Starting server ...")
// Include
const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const mysql = require('mysql');

// Init express app
const app = express();
const cfgFile = fs.readFileSync('./projectCfgConsts.json', 'utf8');
global.cfgJson = JSON.parse(cfgFile);
app.use(express.static(cfgJson.projectPath));

// Create db connection
const connection = mysql.createConnection({
  host: cfgJson.dbHost,
  database: cfgJson.dbName,
  user: cfgJson.dbUser,
  password: cfgJson.dbPass
});

// Add router
const router = express.Router();
// Require the route handlers
const registerRoute = require('./routes/register.js');
const loginRoute = require('./routes/login.js');
// Assign handlers to express app
router.post('/register', registerRoute.register);
// THIS IS SET TO GET FOR TESTING IN BROWSER, CHANGE TO POST 
router.get('/login', loginRoute.login);

// Add the router to the default route
app.use('/api', router);
// Create the https server 
let privateKey = fs.readFileSync('server.key', 'utf8');
let certificate = fs.readFileSync('server.cert', 'utf8');
let credentials = { key: privateKey, cert: certificate };
let httpsServer = https.createServer(credentials, app);
httpsServer.listen(8008);

console.log("Server started successfully")