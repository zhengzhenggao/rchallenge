// Server configuration file
// config.js
const config = {
  app: {},
  api: {
    server: {
      protocal: 'http',
      host: 'ppzeng.gq/instpicserver', // Production Environment: "", Local Testing Env: "localhost"
      port: '', // Default: "", Release Port: ""
      UserLogin: {
        controller: 'user',
        endpoint: 'UserLogin',
        requiredData: [
          /* "company_id", "order_idx" */
        ],
      },
      ListImage: {
        controller: 'image',
        endpoint: 'ListImage',
        requiredData: [],
      },
      UploadImage: {
        controller: 'image',
        endpoint: 'Upload',
        requiredData: [],
      },
    },
  },
  static: {},
};

module.exports = config;
