// Response object import
const PongResponse = require('../response_object/PongResponse.js');

const GenericLogger = require('../operator/GenericLogger.js');



// Manager Logger
const _logger = new GenericLogger("MaintainManager", '7d');

function MaintainManager(req, res, opt)
{
  // Return operative function
  //
  console.log('Entering MaintainManager');
  _logger.logInfo('Entering MaintainManager', "MaintainManager", opt);
  switch (opt)
  {
    case 'ping':
      console.log('Request received to ping');
      return pingOperative(req, res);
  }

  //
  //
  // ping Function group
  // Operative functions
  function pingOperative(req, res)
  {
    // Input data validation
    // N/A

    // Return reponse
    var response = new PongResponse();
    res.statusCode = response.status_code;
    res.send(response.message);
  }

  // elementayr functions
  // N/A

  // ping Function group ENDS
  //
  //
}

module.exports = MaintainManager;
