// Server configuration file
// config.js
const config = {
 app: {
   port: 10086,  // Default: 10086
   printer_config_path: 'configuration/VirtualPrinterConfig.json',
   sms_service_config_path: 'configuration/SMSServiceConfig.json',
   print_job_folder: 'C:\\Print_Job\\',
   mssql_db_config:
   {
    user: 'sa',
    password: 'P@ssw0rd',
    server: '192.168.10.179', // You can use 'localhost\\instance' to connect to named instance
    database: 'BPS_Dev',
    options: 
    {
      enableArithAbort: false
    },
    requestTimeout: 300000, // 5mins
   },
  },
  api:
  {
    sms:
    {
      protocal: "https",
      host: "www.meteorsis.com", 
      port: "",  // Default: "", Release Port: "" 
      username: "bpssms",
      password: "718732",
      CheckAccountQuota:
      {
        controller: "misweb",
        endpoint: "f_getusercredit.aspx",
        requiredData: [/*"company_id", "order_idx"*/]
      },
      SendSms:
      {
        controller: "misweb",
        endpoint: "f_sendsms.aspx",
        requiredData: [/*"company_id", "order_idx"*/]
      },
      CheckSmsStatus:
      {
        controller: "misweb",
        endpoint: "f_getsmsdstatus.aspx",
        requiredData: [/*"company_id", "order_idx"*/]
      },
    },
    wms: {
      protocal: "http",
      host: "192.168.10.2",  // Dev: "10.8.254.12", Production: "192.168.10.2" Port: "8082"
      port: "8082",  // Default: "", Release Port: "8082" 
      SeedingWallRelease:
      {
        controller: "geekplus", // Default: "LMSTesting", Release: "geekplus" 
        endpoint: "api/artemis/pushJson/route/cellRelease?owner_code=EMSD&warehouse_code=EMSD",
        // Default: "geekplus/api/artemis/pushJson/route/cellRelease?owner_code=EMSD&warehouse_code=EMSD"
        // Release: "api/artemis/pushJson/route/cellRelease?owner_code=EMSD&warehouse_code=EMSD"
        requiredData: [/*"company_id", "order_idx"*/]
      }
    }
  },
  static:
  {
    
  }
};

module.exports = config;
