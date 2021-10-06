var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var req_res_logger = require('./operator/RespLogger');

// Loading configuration
const config = require('./config');

// Route configuration
const MaintainManager = require('./manager/MaintainManager.js');
const UserApiController = require('./manager/UserApiController.js');
const ImageApiController = require('./manager/ImageApiController.js');

// Initialize the server
var app = express();
const port = config.app.port;

// Enable CORS
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(req_res_logger);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// Prepare the server



// Application Configuration
// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.get('/ping', (req, res) => {return MaintainManager(req, res, 'ping');});
app.post('/user/:opt', (req, res) => {return UserApiController(req, res, req.params.opt)});
app.post('/image/:opt', (req, res) => {return ImageApiController(req, res, req.params.opt)});

app.listen(port, () => {console.log(`RServer app listening at http://localhost:${port}`);});


// Test
module.exports = app;