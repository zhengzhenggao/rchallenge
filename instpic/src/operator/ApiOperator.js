// import sql_db_worker from '../worker/SQLDatabaseWorker.js';
// import { v4 as uuidv4 } from 'uuid';
// const fetch = require("node-fetch");
const config = require('../config.js');

export default async function ApiOperator(
  api_cat,
  api_name,
  method,
  query_string_data,
  json_data,
  header,
  timeout
) {
  const this_api_cat = config.api[api_cat];
  if (this_api_cat === undefined) {
    throw `UNKNOWN API CATAGORY: ${api_cat}`;
  }

  const this_api_config = config.api[api_cat][api_name];
  if (this_api_config === undefined) {
    throw `UNKNOWN API NAME: ${api_name}`;
  }

  const allowed_method = ['GET', 'POST'];
  if (!allowed_method.includes(method)) {
    throw `UNKNOWN API METHOD: ${method}`;
  }

  // Checking required data
  if (method === 'GET') {
    // Checking query string data

    for (var each_required_data of this_api_config.requiredData) {
      if (!Object.keys(query_string_data).includes(each_required_data)) {
        throw `UNFOUND REQUIRED DATA IN QUERY STRING DATA: ${each_required_data}`;
      }
    }
  } else if (method === 'POST') {
    // Checking both query string and json data
    // console.log(this_api_config);
    // console.log(query_string_data);
    // console.log(json_data);
    // console.log(this_api_cat);

    for (var each_required_data of this_api_config.requiredData) {
      if (
        !Object.keys(query_string_data).includes(each_required_data) &&
        !Object.keys(json_data).includes(each_required_data)
      ) {
        throw `UNFOUND REQUIRED DATA IN BOTH: ${each_required_data}`;
      }
    }
  }

  // Construct API Request
  if (method === 'GET') {
    // GET Request
    var query = new URLSearchParams(query_string_data).toString();
    var url = '';
    if (this_api_cat.port !== '') {
      url = `${this_api_cat.protocal}://${this_api_cat.host}:${this_api_cat.port}`;
      url += `/${this_api_config.controller}/${this_api_config.endpoint}`;
      url += `?${query}`;
    } else {
      url = `${this_api_cat.protocal}://${this_api_cat.host}`;
      url += `/${this_api_config.controller}/${this_api_config.endpoint}`;
      url += `?${query}`;
    }

    // To-do: Timeout feature

    // var api_calling_obj = {
    //   api_uuid: uuidv4(),
    //   api_time: (new Date()).toISOString(),
    //   api_url: url,
    //   api_method: 'GET',
    //   api_payload: null,
    //   success: 0
    // };
    // console.log(url);

    return await fetch(url, {
      headers: header,
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          // sql_db_worker.CallSpRecordApiCalling(api_calling_obj.api_uuid, api_calling_obj.api_time,
          // api_calling_obj.api_url, api_calling_obj.api_method, api_calling_obj.api_payload, api_calling_obj.success);
          throw new Error(res.status);
        }
        console.log(res.headers);
        if (res.headers.get('content-type').includes('application/json')) {
          return res.json();
        }
        return res.text();
      })
      .then((data) => {
        // console.log(data)
        return data;
      })
      .catch((err) => {
        console.error(err.message);
        return undefined;
      });
  }
  if (method === 'POST') {
    // POST Request
    var query = new URLSearchParams(query_string_data).toString();
    var url = '';
    if (this_api_cat.port !== '') {
      url = `${this_api_cat.protocal}://${this_api_cat.host}:${this_api_cat.port}`;
      url += `/${this_api_config.controller}/${this_api_config.endpoint}`;
    } else {
      url = `${this_api_cat.protocal}://${this_api_cat.host}`;
      url += `/${this_api_config.controller}/${this_api_config.endpoint}`;
    }

    if (query !== '') {
      url += `?${query}`;
    }

    // var api_calling_obj = {
    //   api_uuid: uuidv4(),
    //   api_time: (new Date()).toISOString(),
    //   api_url: url,
    //   api_method: 'POST',
    //   api_payload: JSON.stringify(json_data),
    //   success: 0
    // };
    // console.log(json_data);
    return await fetch(url, {
      method: 'POST',
      headers: {
        ...header,
        // "Accept": "application/json",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json_data),
    })
      .then((res) => {
        if (!res.ok) {
          // sql_db_worker.CallSpRecordApiCalling(api_calling_obj.api_uuid, api_calling_obj.api_time,
          // api_calling_obj.api_url, api_calling_obj.api_method, api_calling_obj.api_payload, api_calling_obj.success);
          throw new Error(res.status);
        } else {
          // Success set to 1
          // api_calling_obj.success = 1;
          // sql_db_worker.CallSpRecordApiCalling(api_calling_obj.api_uuid, api_calling_obj.api_time,
          // api_calling_obj.api_url, api_calling_obj.api_method, api_calling_obj.api_payload, api_calling_obj.success);
        }
        // console.log(res);
        if (res.headers.get('content-type').includes('application/json')) {
          return res.json();
        }
        return res.text();
      })
      .then((data) => {
        // console.log(data)
        return data;
      })
      .catch((err) => {
        console.error(err.message);
        return undefined;
      });
  }
}
