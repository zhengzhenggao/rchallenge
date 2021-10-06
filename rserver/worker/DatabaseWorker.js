// Logger
const GenericLogger = require('../operator/GenericLogger.js');
const _logger = new GenericLogger("DatabaseWorker", '7d');


// SQLite Connector
const sqlite_connector = require('../operator/SQLiteDBConnector.js');

class DatabaseWorker
{
  constructor()
  {
    _logger.logInfo("Database Worker Initialized", "Constructor", "");
  }

  async createUserRecord(username, password)
  {
    return await new Promise((resolve, reject) => {
      try
      {
        var sql = "INSERT INTO User VALUES (?,?);"
        var data_array = [username, password];

        sqlite_connector.db.run(sql, data_array, (err) => {
          if (err)
          {
            _logger.logError("createUserRecord ERROR", "createUserRecord", err);
            resolve({success: false});
          }
          else // Success
          {
            _logger.logInfo("createUserRecord SUCCESSFUL", "createUserRecord", username, password);
            resolve({success: true});
          }
        });
      }
      catch (error)
      {
        _logger.logError("createUserRecord ERROR", "createUserRecord", err, username, password);
        resolve({success: false});
      }
    });
  }

  async fetchUserPassword(username)
  {
    return await new Promise((resolve, reject) => {
      try
      {
        var sql = "SELECT password FROM User WHERE username = ?;"
        var data_array = [username,];

        sqlite_connector.db.all(sql, data_array, (err, rows) => {
          if (err)
          {
            _logger.logError("fetchUserPassword ERROR", "fetchUserPassword", err);
            throw err;
          }
          else // Success
          {
            _logger.logInfo("fetchUserPassword SUCCESSFUL", "fetchUserPassword", username);
            resolve({success: true, data: rows});
          }
        });
      }
      catch (error)
      {
        _logger.logError("fetchUserPassword ERROR", "fetchUserPassword", err, username);
        resolve({success: false});
      }
    });
  }

  async createImageRecord(uuid, username, image_data, image_desc, timestamp)
  {
    return await new Promise((resolve, reject) => {
      try
      {
        var sql = "INSERT INTO Image VALUES (?,?,?,?,?);"
        var data_array = [uuid, username, image_data, image_desc, timestamp];

        sqlite_connector.db.run(sql, data_array, (err) => {
          if (err)
          {
            _logger.logError("createImageRecord ERROR", "createImageRecord", err);
            throw err;
          }
          else // Success
          {
            _logger.logInfo("createImageRecord SUCCESSFUL", "createImageRecord", username, uuid, timestamp);
          }
        });
      }
      catch (error)
      {
        _logger.logError("createImageRecord ERROR", "createImageRecord", err, username, uuid, timestamp);
        resolve({success: false});
      }
      resolve({success: true});
    });
  }

  async fetchImageRecord(filter_username, sort_key, sort_dir, offset, nextset) {
    return await new Promise((resolve, reject) => {
      try
      {
        var sql = "SELECT * FROM Image WHERE username LIKE ? ORDER BY "+ sort_key +" " + sort_dir +" LIMIT ? OFFSET ?;"
        var data_array = [filter_username, nextset, offset];

        sqlite_connector.db.all(sql, data_array, (err, rows) => {
          if (err)
          {
            _logger.logError("fetchImageRecord ERROR", "fetchImageRecord", err);
            throw err;
          }
          else // Success
          {
            _logger.logInfo("fetchImageRecord SUCCESSFUL", "fetchImageRecord", filter_username, sort_key, sort_dir);
            resolve({success: true, data: rows});
          }
        });
      }
      catch (error)
      {
        _logger.logError("fetchImageRecord ERROR", "fetchImageRecord", err, filter_username, sort_key, sort_dir);
        resolve({success: false});
      }
    });
  }

  async fetchImageRecordCount(filter_username, sort_key, sort_dir) {
    return await new Promise((resolve, reject) => {
      try
      {
        var sql = "SELECT COUNT(*) AS count FROM Image WHERE username LIKE ? ORDER BY "+ sort_key +" " + sort_dir;
        var data_array = [filter_username];

        sqlite_connector.db.all(sql, data_array, (err, rows) => {
          if (err)
          {
            _logger.logError("fetchImageRecordCount ERROR", "fetchImageRecordCount", err);
            throw err;
          }
          else // Success
          {
            _logger.logInfo("fetchImageRecordCount SUCCESSFUL", "fetchImageRecordCount", filter_username, sort_key, sort_dir);
            resolve({success: true, data: rows[0].count});
          }
        });
      }
      catch (error)
      {
        _logger.logError("fetchImageRecord ERROR", "fetchImageRecord", err, filter_username, sort_key, sort_dir);
        resolve({success: false});
      }
    });
  }

  // Old project
  async createPrintJobRecord(job_id, printer_name, filename, filepath, status, store_time)
  {
    return await new Promise((resolve, reject) => {
      try
      {
        var sql = "INSERT INTO PrintJobRecord VALUES (?,?,?,?,?,?,?,?);"
        var data_array = [job_id, printer_name, filename, filepath, status, store_time, null, null];

        sqlite_connector.db.run(sql, data_array, (err) => {
          if (err)
          {
            // _logger.logError("Inserting print job record ERROR", "createPrintJobRecord", err);
            throw err;
          }
          else // Success
          {
            _logger.logInfo("Inserting print job record SUCCESSFUL", "createPrintJobRecord", job_id, printer_name, filename, filepath, status, store_time);
          }
        });
      }
      catch (error)
      {
        _logger.logError("Inserting print job record ERROR", "createPrintJobRecord", err, job_id, printer_name, filename, filepath, status, store_time);
        resolve({success: false});
      }
      resolve({success: true});
    });
  }


  async updatePrintJobRecordSendStatus(job_id, status, send_time)
  {
    return await new Promise((resolve, reject) => {
      try
      {
        var sql = "UPDATE PrintJobRecord SET status = ?, sendTime = ? WHERE jobID = ?;"
        var data_array = [status, send_time, job_id];

        sqlite_connector.db.run(sql, data_array, (err) => {
          if (err)
          {
            // _logger.logError("Inserting print job record ERROR", "createPrintJobRecord", err);
            throw err;
          }
          else // Success
          {
            _logger.logInfo("Updating print job send record SUCCESSFUL", "updatePrintJobRecordSendStatus", job_id, status, send_time);
          }
        });
      }
      catch (error)
      {
        _logger.logError("Updating print job send record ERROR", "updatePrintJobRecordSendStatus", err, job_id, status, send_time);
        resolve({success: false});
      }
      resolve({success: true});
    });
  }

  async updatePrintJobRecordPrintStatus(job_id, status, print_time)
  {
    return await new Promise((resolve, reject) => {
      try
      {
        var sql = "UPDATE PrintJobRecord SET status = ?, successTime = ? WHERE jobID = ?;"
        var data_array = [status, print_time, job_id];

        sqlite_connector.db.run(sql, data_array, (err) => {
          if (err)
          {
            // _logger.logError("Inserting print job record ERROR", "createPrintJobRecord", err);
            throw err;
          }
          else // Success
          {
            _logger.logInfo("Updating print job print record SUCCESSFUL", "updatePrintJobRecordPrintStatus", job_id, status, print_time);
          }
        });
      }
      catch (error)
      {
        _logger.logError("Updating print job print record ERROR", "updatePrintJobRecordPrintStatus", err, job_id, status, print_time);
        resolve({success: false});
      }
      resolve({success: true});
    });
  }

  async fetchUnsentPrintJobRecord(printer_name)
  {
    return await new Promise((resolve, reject) => {
      try
      {
        var sql = "SELECT * FROM PrintJobRecord WHERE status = ? AND printerName = ?;"
        var data_array = ['stored', printer_name];

        sqlite_connector.db.all(sql, data_array, (err, rows) => {
          if (err)
          {
            // _logger.logError("Inserting print job record ERROR", "createPrintJobRecord", err);
            throw err;
          }
          else // Success
          {
            _logger.logInfo("Fetching unsent print job record SUCCESSFUL", "fetchUnsentPrintJobRecord", printer_name);
            resolve({success: true, data: rows});
          }
        });
      }
      catch (error)
      {
        _logger.logError("Fetching unsent print job record ERROR", "fetchUnsentPrintJobRecord", err, printer_name);
        resolve({success: false});
      }
    });
  }

  async fetchUnsuccessfulPrintJobRecord(printer_name)
  {
    return await new Promise((resolve, reject) => {
      try
      {
        var sql = "SELECT * FROM PrintJobRecord WHERE status = ? AND printerName = ?;"
        var data_array = ['sent', printer_name];

        sqlite_connector.db.all(sql, data_array, (err, rows) => {
          if (err)
          {
            // _logger.logError("Inserting print job record ERROR", "createPrintJobRecord", err);
            throw err;
          }
          else // Success
          {
            _logger.logInfo("Fetching unsuccess print job record SUCCESSFUL", "fetchUnsuccessfulPrintJobRecord", printer_name);
            resolve({success: true, data: rows});
          }
        });
      }
      catch (error)
      {
        _logger.logError("Fetching unsuccess print job record ERROR", "fetchUnsuccessfulPrintJobRecord", err, printer_name);
        resolve({success: false});
      }
    });
  }
}


// DO NOT CHANGE LINES AFTER THIS MARKER
let database_worker = new DatabaseWorker();
module.exports = database_worker;
