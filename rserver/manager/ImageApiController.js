// Response object import
const ErrorResponse = require('../response_object/ErrorResponse.js');

// Outgoin Request object import

const GenericLogger = require('../operator/GenericLogger.js');

// Manager Logger
const _logger = new GenericLogger("ImageApiController", '7d');


// Request Model 
const ImageUploadRequestModel = require('../request_model/ImageUploadRequestModel.js');
const ImageListRequestModel = require('../request_model/ImageListRequestModel.js');

// Import DAO Class
const UserApiDAO = require('./dao/UserApiDAO.js');

const { v4 } = require('uuid');
const uuid = v4();
const ImageApiDAO = require('./dao/ImageApiDAO.js');


async function ImageApiController(req, res, opt)
{
  // Return operative function
  //
  console.log('Entering ImageApiController');
  _logger.logInfo('Entering ImageApiController', "ImageApiController", opt);
  _logger.logInfo('Receive request', "ImageApiController", req.body);
  try
  {
    

    switch (opt)
    {
      case 'Upload':
        // console.log('Request received to UserSignup');
        return await Upload(req, res);
      case "ListImage":
        // console.log('Request received to ListImage');
        return await ListImage(req, res);
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
  // Upload Function group
  async function Upload(req, res)
  {
    // Input data validation
    // console.log(req);
    var req_data = new ImageUploadRequestModel(req.body);
    // console.log(req.headers);

    // Check the token and get username
    var username = verifyToken(req);

    var dao = new ImageApiDAO();
    var upload_result = await dao.createImageRecord(username, req_data.data, req_data.desc, uuid, Date.now());
    res.json({success: upload_result});

  }

  // ListImage Function group
  async function ListImage(req, res)
  {

    var username = verifyToken(req);
    // Input data validation
    // console.log(req);
    var req_data = new ImageListRequestModel(req.body);
    // console.log(req_data);

    // Fetch Image data
    var dao = new ImageApiDAO();
    var fetch_result = await dao.fetchImageRecord(req_data.filterUsername, req_data.sortKey, req_data.sortDir, req_data.pagination, req_data.page);

    res.json({success: true, data: fetch_result});
  }

  // Element functions
  function verifyToken(req)
  {
    const token = req.headers.authorization;

    // Calling User DAO
    var user_dao = new UserApiDAO();
    var username = user_dao.verifyToken(token);
    return username;
  }
}

module.exports = ImageApiController;