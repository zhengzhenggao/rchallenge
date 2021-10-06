const BaseRequestModel = require('./BaseRequestModel.js');

class UserVerifyRequestModel extends BaseRequestModel
{
  constructor(received_data)
  {
    // Super Constructor
    super(received_data);
    // Required data
    this.required = [...this.required, ...["username"]];
    this.optional = [...this.optional];

    // Parse the received data
    this.dataParser(received_data);
  }
}
module.exports = UserVerifyRequestModel;