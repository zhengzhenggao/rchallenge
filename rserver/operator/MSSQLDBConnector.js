const mssql = require('mssql');
const path = require('path');
const config = require('../config');

class MSSQLDBConnector
{

  constructor()
  {
    // Loading connector config data
    this.pool = new mssql.ConnectionPool(config.app.mssql_db_config);
    
  }

  async connect()
  {
    try
    {
      await this.pool.connect();
      return this.pool;
    }
    catch(e)
    {
      console.error(e);
      throw "1001";
    }
  } 

  async reconnect()
  {
    try
    {
      await this.connect()
    }
    catch(e)
    {
      console.error(e);
      throw "1002";
    }
  }
}

// DO NOT MODIFY CODES AFTER THIS LINE
// UNLESS YOU KNOW WHAT YOU ARE DOING
const mssql_connector = new MSSQLDBConnector();
export default mssql_connector;
