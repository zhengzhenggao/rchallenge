const path = require('path');
const rfs = require('rotating-file-stream');

class GenericLogger
{
  constructor(logger_name, rotation_interval)
  {
    this.logger_name = logger_name;
    this.rotation_interval = rotation_interval;

    this.file_writer = this.createFileWriter();
  }


  // Initializer
  createFileWriter()
  {
    var log_stream = rfs.createStream(this.logger_name+'.log', {
      interval: this.rotation_interval, // rotate daily
      path: path.join(__dirname, 'log')
    });
    return log_stream;
  }

  // Opearative function
  logError(msg, function_name, ...data)
  {
    // Constructed the information
    var msg_type = "[ERROR] - ";
    var msg_time = new Date().toISOString() + " - ";
    var function_name = function_name + " - "
    var msg_data = "";
    for (var each_data of data)
    {
      msg_data += JSON.stringify(each_data) + "\t";
    }
    var log_msg = msg_type + msg_time + function_name + msg + "\n";
    log_msg += msg_data + "\n";
    this.file_writer.write(log_msg);
  }

  logInfo(msg, function_name, ...data)
  {
    // Constructed the information
    var msg_type = "[INFO] - ";
    var msg_time = new Date().toISOString() + " - ";
    var function_name = function_name + " - "
    var msg_data = "";
    for (var each_data of data)
    {
      msg_data += JSON.stringify(each_data) + "\t";
    }

    var log_msg = msg_type + msg_time + function_name + msg + "\n";
    log_msg += msg_data + "\n";

    this.file_writer.write(log_msg);
  }
}

module.exports = GenericLogger;
