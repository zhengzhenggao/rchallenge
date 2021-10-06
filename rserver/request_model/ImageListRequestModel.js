const BaseRequestModel = require('./BaseRequestModel.js');

class ImageListRequestModel extends BaseRequestModel
{
  constructor(received_data)
  {
    // Super Constructor
    super(received_data);
    // Required data
    this.required = [...this.required, ...[]];
    this.optional = [...this.optional, ...["filterUsername", "sortKey", "sortDir", "pagination", "page"]];

    // Parse the received data
    this.dataParser(received_data);
  }
}

module.exports = ImageListRequestModel;