// Include 
var fs = require('fs');
const path = require('path');
var https = require('https');
// Set cert 
var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.cert', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var express = require('express');
var app = express();
app.use(express.static('C:\\Users\\Alex\\Desktop\\dawjs proiect\\Picolo'));

// TODO: add route dispath
app.get('/',function(req,res){
   res.sendFile(path.join(__dirname+'/pages/login.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/index.html',function(req,res){
   res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});


var httpsServer = https.createServer(credentials, app);
httpsServer.listen(3000);