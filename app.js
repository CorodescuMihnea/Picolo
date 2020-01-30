// Include
const fs = require('fs')
	, path = require('path')
	, https = require('https')
	, express = require('express')
	, bodyParser = require('body-parser');

console.log("Starting server ...")

// Init express app
const app = express();
const cfgFile = fs.readFileSync('./projectCfgConsts.json', 'utf8');
global.cfgJson = JSON.parse(cfgFile);

// App env vars
app.set('port', 8008);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Add the router to the default route

// Create the https server 
let privateKey = fs.readFileSync('server.key', 'utf8');
let certificate = fs.readFileSync('server.cert', 'utf8');
let credentials = { key: privateKey, cert: certificate };
let httpsServer = https.createServer(credentials, app);
httpsServer.listen(8008);

console.log("Server started successfully");

// Add router
const router = express.Router();
// Require the route handlers
const registerRoute = require('./controllers/register.js');
const loginRoute = require('./controllers/login.js');
// Add the routes
router.get('/', loginRoute.login);
router.post('/', loginRoute.login);

router.get('/login', loginRoute.login);
router.post('/login', loginRoute.login);

router.get('/register', registerRoute.register);
router.post('/register', registerRoute.register);

app.use('/', router);
