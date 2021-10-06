// Response object import
const ErrorResponse = require('../response_object/ErrorResponse.js');

// Outgoin Request object import


const GenericLogger = require('../operator/GenericLogger.js');

// Manager Logger
const _logger = new GenericLogger("UserApiController", '7d');


// Request Model 
const UserSignupRequestModel  = require('../request_model/UserSignupRequestModel.js');
const UserVerifyRequestModel = require('../request_model/UserVerifyRequestModel.js');

// Import DAO Class
const UserApiDAO = require('./dao/UserApiDAO.js');


async function UserApiController(req, res, opt)
{
  // Return operative function
  //
  // console.log('Entering UserApiController');
  _logger.logInfo('Entering UserApiController', "UserApiController", opt);
  _logger.logInfo('Receive request', "UserApiController", req.body);
  try
  {
    

    switch (opt)
    {
      case 'UserSignup':
        // console.log('Request received to UserSignup');
        return await UserSignup(req, res);
      case "UserLogin":
        // console.log('Request received to UserLogin');
        return await UserLogin(req, res);
      case "UserVerify":
        // console.log('Request received to OrderCompleteOperative');
        return await UserVerify(req, res);
      default:
        throw "405";  // Not allowed
    }
  }
  catch (err)
  {
    console.error(err);
    _logger.logError(`Error when process ${opt}`, 'UserApiController', req.body, err);
    var error_res= new ErrorResponse(err, req);
    res.statusCode = error_res.status_code;
    res.json(error_res);
    return;
  }
  

  //
  //
  // Operative functions
  // UserLogin Function group
  async function UserLogin(req, res)
  {
    // Input data validation
    // console.log(req);
    var req_data = new UserSignupRequestModel(req.body);
    // console.log(req_data);

    // User DAO
    var dao = new UserApiDAO();

    // Token Verification
    var match_result = await dao.loginUser(req_data.username, req_data.password);

    if (match_result)
    {
      res.json({
        token: dao.generateToken(req_data.username),
        username: req_data.username
      });
    }
    else
    {
      throw "404";
    }
  }

  // UserSignup Function group
  async function UserSignup(req, res)
  {
    // Input data validation
    // console.log(req);
    var req_data = new UserSignupRequestModel(req.body);

    // User DAO
    var dao = new UserApiDAO();

    

    var insert_result = await dao.signupUser(req_data.username, req_data.password);
    res.json({success: insert_result});
  }

  // UserVerify function group
  async function UserVerify(req, res)
  {
    // Input data validation
    // console.log(req);
    var req_data = new UserVerifyRequestModel(req.body);

    const token = req.headers.authorization;

    // Calling User DAO
    var dao = new UserApiDAO();
    var username = dao.verifyToken(token);
    res.json({success: username==req_data.username});
  }

}

module.exports = UserApiController;
