# InstPic Server Readme
## Production Endpoint
```
http://ppzeng.gq/instpicserver/
```
## Start from SourceCode
### Install Dependancies
```
npm install
```

### Test server
```
npm test
```

### Start server
```
npm start
```

## API Document
- **User - Signup**
    - Endpoint: /user/signup
    - Method: POST
    - Data Type: application/json
    - Example payload:
    ```
    {
        "username": "test",
        "password": "123456"
    }
    ```
    - Success Response:
    ```
    {
        "success": true
    }
    ```
    - Error Response:
    ```
    {
        "success": false
    }
    ```

- **User - Login**
    - Endpoint: /user/login
    - Method: POST
    - Data Type: application/json
    - Example payload:
    ```
    {
        "username": "test",
        "password": "123456"
    }
    ```
    - Success Response:
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdCIsImlhdCI6MTYzMzUyNTE1MSwiZXhwIjoxNjMzNTMyMzUxfQ.FvmM13fHUpYZSCnSLlfIYNL4Zv0WcZ_dtEx6dnUjB64",
        "username": "test"
    }
    ```
    - Error Response:
    ```
    {
        "error_code": "403",
        "error_msg": "Uknown Error",
        "status_code": 202
    }
    ```
    
- **Image - ListImage**
- Endpoint: /image/ListImage
    - Method: POST
    - Data Type: application/json
    - Hear payload:
    ```
    {
        "authorization": *userToken*
    }
    ```
    - Example payload:
    ```
    {
        "filterUsername": "",
        "sortKey": "timestamp",
        "sortDir": "DESC",
        "pagination": 5,
        "page": 1
    }
    ```
    - Success Response:
    ```
    {
        "success": true,
        "data": {
            "success": true,
            "data": [
                {
                    "uuid": *imageUUID*,
                    "username": *imageUploadUser*,
                    "image": *imageDataInBase64*,
                    "desc": *imageDescription*,
                    "timestamp": *imageTimestamp*
                },
                ...
            ],
            "totalDataCount": 8
        }
    }
    ```
    - Error Response:
    ```
    {
        "error_code": "401",
        "error_msg": "Unauthorized",
        "status_code": 202
    }
    ```

- **Image - Upload**
- Endpoint: /image/Upload
    - Method: POST
    - Data Type: application/json
    - Hear payload:
    ```
    {
        "authorization": *userToken*
    }
    ```
    - Example payload:
    ```
    {
        "desc": *imageDescription*,
        "data": *imageDataInBase64*
    }
    ```
    - Success Response:
    ```
    {
        "success": true
    }
    ```
    - Error Response:
    ```
    {
        "success": false
    }
    ```
        OR
    ```
    {
        "error_code": "401",
        "error_msg": "Unauthorized",
        "status_code": 202
    }
    ```


## For reference
### Implemented
    - Signup 
    - Login
    - Image Upload
    - Pagination
