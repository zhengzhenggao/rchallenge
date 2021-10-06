var morgan = require('morgan')
var path = require('path')
var rfs = require('rotating-file-stream') // version 2.x



// create a rotating write stream
var req_res_log_stream = rfs.createStream('ReqRes.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

// setup the logger
var logger = morgan('combined', { stream: req_res_log_stream });

module.exports = logger;
