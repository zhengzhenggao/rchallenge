const BaseRequestModel = require('./BaseRequestModel.js');

class ImageUploadRequestModel extends BaseRequestModel
{
  constructor(received_data)
  {
    // Super Constructor
    super(received_data);
    // Required data
    this.required = [...this.required, ...["data", "desc"]];
    this.optional = [...this.optional];

    // Parse the received data
    this.dataParser(received_data);
  }
}

module.exports = ImageUploadRequestModel;