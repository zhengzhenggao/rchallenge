const  BaseRequestModel = require('./BaseRequestModel.js');

class UserSignupRequestModel extends BaseRequestModel
{
  constructor(received_data)
  {
    // Super Constructor
    super(received_data);
    // Required data
    this.required = [...this.required, ...["username", "password"]];
    this.optional = [...this.optional];

    // Parse the received data
    this.dataParser(received_data);
  }
}

module.exports = UserSignupRequestModel;
