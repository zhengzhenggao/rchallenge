class ErrorResponse
{
  constructor(error_code, error_data, ex, include_data)
  {

    // public string error_code { set; get; }
    // public string error_msg { set; get; }
    // public object error_data { set; get; }

    // public string ex_name { set; get; }
    // public string ex_msg { set; get; }
    // public string ex_stacktrace { set; get; }

    this.error_code = error_code;
    this.getErrorMessage(error_code);
    if (ex !== undefined)
    {
      this.ex_msg = ex.message;
      this.ex_stacktrace = ex.stack;
      this.ex_name = ex.code;
    }
    else
    {
      this.ex_msg = undefined;
      this.ex_stacktrace = undefined;
      this.ex_name = undefined;
    }
    

    // HTTP response code
    this.status_code = 202;


    if (include_data)
    {
      // Prevent classified information leakage
      this.error_data = error_data;
    }

    
  }

  getErrorMessage(error_code)
  {
    switch (error_code)
    {
      // General Error
      case "401":
        this.error_msg = "Unauthorized";
        break;
      case "405":
        this.error_msg = "Method Not Allowed";
        break;
      case "406":
        this.error_msg = "Invalid Parameters";
        break;
      case "480":
        this.error_msg = "Cannot Parse Parameters";
        break;
      case "500":
        this.error_msg = "Internal Unknown Error";
        break;
      case "599":
        this.error_msg = "Database Unknown Error";
        break;
      //
      // Program Specific Error
      case "1001":
        this.error_msg = "Database Connection Failed";
        break;
      case "1002":
        this.error_msg = "Database Re-Connection Failed";
        break;
      //
      // Database Stored Procedures Error Block
      case "1010":  
        this.error_msg = "Database Call Stored Procedure Failed";
        break;
      //
      // Server Manager Error Block
      // Locker API Manager Error Block, 10100-10999
      case "10100":
        this.error_msg = "Invalid QRcode Provided";
        break;
      case "10101":
        this.error_msg = "Unknown QRcode Provided";
        break;
      case "10102":
        this.error_msg = "Order Already Completed";
        break;
      case "10103":
        this.error_msg = "Order Already Overdued";
        break;
      case "10104":
        this.error_msg = "Order Manually Overrided";
        break;
      case "10105":
        this.error_msg = "Invalid OTP Provided";
        break;
      case "10106":
        this.error_msg = "Incorrect OTP Provided";
        break;
      case "10201":
        this.error_msg = "Cell Information Not Match";
        break;
      case "10999":
        this.error_msg = "Order Unknown Error";
        break;
      // WMS API Manager Error Block, 15100-15999
      case "15100":
        this.error_msg = "Incorrect API Data";
        break;
      case "15101":
        this.error_msg = "Order ID not existed in DB";
        break;
      case "15999":
        this.error_msg = "WMS API Unknown Error";
        break;
      //Management API Manager Error Block, 20100-20999
      case "20100":
        this.error_msg = "Incorrect Datafile Data Format";
        break;
      case "20101":
        this.error_msg = "Incorrect Datafile Date Format";
        break;
      case "20102":
        this.error_msg = "Incorrect Datafile Mobile Format";
        break;
      case "20103":
        this.error_msg = "Incorrect Datafile Order Type Format";
        break;
      case "20109":
        this.error_msg = "Datafile Import Unknown Error";
        break;
      case "20110":
        this.error_msg = "Incorrect Report Time Period";
        break;
      case "20111":
        this.error_msg = "Cannot Fetch Last Datafile Information";
        break;
      case "20112":
        this.error_msg = "Cannot Fetch Order Information";
        break;
      case "20115":
        this.error_msg = "Only Auto to Manual Switch allowed";
        break;
      case "20116":
        this.error_msg = "Only Unfinished Order allowed";
        break;
      case "20117":
        this.error_msg = "Cannot unlock Order cell on WMS API";
        break;
      case "20118":
        this.error_msg = "Cannot change Order Type";
        break;
      case "20119":
        this.error_msg = "AUTO Order status cannot be changed manually";
        break;
      case "20120":
        this.error_msg = "Order status CREATE can be only changed to READY";
        break;
      case "20121":
        this.error_msg = "Order status READY can be only changed to COMPLETED or OVERDUE";
        break;
      case "20122":
        this.error_msg = "Order status COMPLETED cannot be changed";
        break;
      case "20123":
        this.error_msg = "Order status OVERDUE can be only changed to COMPLETED";
        break;
      case "20124":
        this.error_msg = "Only Overdue/Ready order can be switched to Manual";
        break;
      case "20150":
        this.error_msg = "Invalid order status";
        break;
      case "20999":
        this.error_msg = "Management Unknown Error";
        break;
      // QRcode API Error Block, 30100-30999
      case "30100":
        this.error_msg = "Unknown ShortUrl";
        break;
      case "30101":
        this.error_msg = "ShortUrl Already Completed";
        break;
      case "30999":
        this.error_msg = "QRcode Unknown Error";
        break;
      default:
        this.error_msg = "Uknown Error";
        break;
    }
  }
}


class ErrorCode
{

  constructor(error_code)
  {
    // Assign the error code first
    this.error_code = error_code;

    switch (error_code)
    {
      case "406":
          this.error_msg = "Invalid Parameters";
          return;
      case "500":
          this.error_msg = "Internal Unknown Error";
          return;
      case "599":
          this.error_msg = "Database Unknown Error";
          return;
      default:
          this.error_code = "9999";
          this.error_msg = "Uknown Error";
          return;
    }

  }
}
module.exports = ErrorResponse;