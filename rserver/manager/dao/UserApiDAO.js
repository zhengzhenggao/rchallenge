const GenericLogger = require('../../operator/GenericLogger.js');
const _logger = new GenericLogger("UserApiDAO", '7d');

const  database_worker = require('../../worker/DatabaseWorker.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const server_secret = "rserversecret";


class UserApiDAO {
  constructor()
  {

  }

  // User Related Function
  generateToken(username)
  {
    return jwt.sign({data: username}, server_secret, {expiresIn: "2h"});
  }

  verifyToken(token)
  {
    if (!token)
    {
      return false;
    }
    try
    {
      var token_data = jwt.verify(token, server_secret).data;
      if (!token_data)
      {
        throw "401";
      }
      return token_data;
    }
    catch (err)
    {
      console.error(err);
      throw "401";
    }
    
  }

  async signupUser(username, password)
  {
    // Hash the password
    var hash = bcrypt.hashSync(password, 10);
    var insert_result = await database_worker.createUserRecord(username, hash);
    if (!insert_result)
    {
      throw "500";
    }
    else
    {
      return insert_result.success;
    }
  }

  async loginUser(username, password)
  {
    // console.log(username, password);
    var fetch_result = await database_worker.fetchUserPassword(username);
    if (!fetch_result.success)
    {
      throw "500";
    }
    // console.log(fetch_result.data[0]);
    try
    {
      var match = bcrypt.compareSync(password, fetch_result.data[0].password);
      if (!match)
      {
        throw "403";
      }
      else
      {
        return true;
      }
    }
    catch(err)
    {
      throw "403";
    }
  }
}

module.exports = UserApiDAO;