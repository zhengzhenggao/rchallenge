class BaseRequestModel
{
  constructor()
  {
      this.required = [];
      this.optional = [];

  }

  dataParser(received_data)
  {
    var each_key;
    // Map required data
    for(each_key of this.required)
    {
      var get_data = received_data[each_key];
      // console.log('Each key: ',each_key , get_data);
      if (get_data == undefined)
      {
        // Not enough required data
        console.error('Data ', each_key, ' is not found.');
        throw '406';
      }
      this[each_key] = get_data;  // Data will be undefined
    }

    // Map optional data
    for(each_key of this.optional)
    {
      var get_data = received_data[each_key];
      this[each_key] = get_data;
    }

    // Check unexpected data
    for (each_key of Object.keys(received_data))
    {
      if (!this.required.includes(each_key) && !this.optional.includes(each_key))
      {
        console.error("Found excessive value: ", each_key);
        throw "422";
      }
    }
  }
}

module.exports = BaseRequestModel;