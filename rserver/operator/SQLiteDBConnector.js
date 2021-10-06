const sqlite3 =require('sqlite3').verbose();
const path = require('path');

class SQLiteDBConnector
{
  constructor()
  {
    var db_path = path.join(__dirname, '../db/data.db');
    let db = new sqlite3.Database(db_path, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the Exchange database.');
    });
    this.db = db;
  }

  reconnect()
  {
    var db_path = path.join(__dirname, '../db/data.db');
    let db = new sqlite3.Database(db_path, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Reconnected to the Exchange database.');
    });
    this.db = db;
  }
}


const sqlite_connector = new SQLiteDBConnector();
module.exports = sqlite_connector;
