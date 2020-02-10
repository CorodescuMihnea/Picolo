// Include
const fs = require('fs'),
	path = require('path'),
	https = require('https'),
	express = require('express'),
	express_session = require('express-session'),
	bodyParser = require('body-parser');


console.log("Starting server ...")

// Init express app
const app = express();
const cfgFile = fs.readFileSync('./projectCfgConsts.json', 'utf8');
global.cfgJson = JSON.parse(cfgFile);

// App env vars
app.set('port', cfgJson.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(express_session({
  secret: 'fml',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}))

// Add the router to the default route

// Create the https server 
let privateKey = fs.readFileSync('server.key', 'utf8');
let certificate = fs.readFileSync('server.cert', 'utf8');
let credentials = { key: privateKey, cert: certificate };
let httpsServer = https.createServer(credentials, app);
httpsServer.listen(cfgJson.port);

console.log("Server started successfully");

// Add router
const router = express.Router();
// Require the route handlers
const registerRoute = require('./controllers/register.js');
const loginRoute = require('./controllers/login.js');
const dashboardRoute = require('./controllers/dashboard.js');
const workerRoute = require('./controllers/worker.js');
const logoutRoute = require('./controllers/logout.js');
const profileRoute = require('./controllers/profile.js');

// Add the routes
router.get('/', loginRoute.login);
router.post('/', loginRoute.login);

router.get('/login', loginRoute.login);
router.post('/login', loginRoute.login);

router.get('/register', registerRoute.register);
router.post('/register', registerRoute.register);

router.get('/dashboard', dashboardRoute.getDashboard);

router.post('/worker', workerRoute.getWorker);

router.get('/logout', logoutRoute.logout);

router.get('/profile', profileRoute.getProfile);
router.put('/profile', profileRoute.updateProfile);

app.use('/', router);

