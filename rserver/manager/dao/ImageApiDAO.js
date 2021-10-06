const GenericLogger = require('../../operator/GenericLogger.js');
const _logger = new GenericLogger("ImageApiDAO", '7d');

const database_worker = require('../../worker/DatabaseWorker.js');


class ImageApiDAO {
  constructor()
  {
      
  }

  async createImageRecord(username, data, image_desc, uuid, timestamp)
  {

    var image_data = Buffer.from(data, "base64");

    var create_result = await database_worker.createImageRecord(uuid, username, image_data, image_desc, timestamp);
    // console.log(create_result);
    if (!create_result.success)
    {
      throw "599";
    }

    try 
    {
      return create_result.success;
    }
    catch
    {
      throw "599";
    }
  }

  async fetchImageRecord(filter_username, sort_key, sort_dir, pagination, page) {

    // Pagination part
    var offset = 0;
    var nextset = 1000;
    if (pagination !== undefined && page !== undefined)
    {
      offset = (page - 1) * pagination;
      nextset = pagination;
    }

    // Sorting
    if (sort_key !== undefined && sort_dir !== undefined)
    {
      if (!sort_key in ["timestamp"])
      {
        throw "406";
      }
      if (sort_dir in ["ASC", "DESC"])
      {
        throw "406";
      }
    }
    else
    {
      // Default sorting, no key, asc order
      sort_key = null;
      sort_dir = "ASC";
    }


    // Username filter
    if (filter_username === undefined || filter_username === "")
    {
      filter_username = "%";
    }

    var fetch_result = await database_worker.fetchImageRecord(filter_username, sort_key, sort_dir, offset, nextset);
    // console.log(fetch_result);
    if (!fetch_result.success)
    {
      throw "599";
    }
    try 
    {
      // Encode image data to base64
      for (var each_image of fetch_result.data)
      {
        console.log(each_image);
        var image_data_base64 = Buffer.from(each_image.image, "byte").toString("base64");
        each_image.image = image_data_base64;
      }
      var count_result = await database_worker.fetchImageRecordCount(filter_username, sort_key, sort_dir);
      fetch_result.totalDataCount = count_result.data;
      return fetch_result;
    }
    catch (err)
    {
      console.error(err);
      throw "599";
    }
  }

}

module.exports = ImageApiDAO;