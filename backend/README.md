# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Method: POST

### Description:
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

### Request Body:
The request body should be a JSON object with the following structure:
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

### Validation:
- `email`: Must be a valid email address.
- `fullname.firstname`: Must be at least 3 characters long.
- `password`: Must be at least 5 characters long.

### Responses:

#### Success (201):
```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string"
  }
}
```

#### Error (400):
```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

### Example Request:
```bash
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
    "password": "password123"
}'
```

### Example Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

# Captain Registration Endpoint Documentation

## Endpoint: `/captains/register`

### Method: POST

### Description:
This endpoint is used to register a new captain. It requires the captain's first name, last name, email, password, and vehicle details.

### Request Body:
The request body should be a JSON object with the following structure:
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}
```

### Validation:
- `email`: Must be a valid email address.
- `fullname.firstname`: Must be at least 3 characters long.
- `password`: Must be at least 5 characters long.
- `vehicle.color`: Must be at least 3 characters long.
- `vehicle.plate`: Must be at least 3 characters long.
- `vehicle.capacity`: Must be a number.
- `vehicle.vehicleType`: Must be one of ['car', 'motorcycle', 'auto'].

### Responses:

#### Success (201):
```json
{
  "token": "string",
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  }
}
```

#### Error (400):
```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

### Example Request:
```bash
curl -X POST http://localhost:3000/captains/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}'
```

### Example Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

# User Login Endpoint Documentation

## Endpoint: `/users/login`

### Method: POST

### Description:
This endpoint is used to log in an existing user. It requires the user's email and password.

### Request Body:
The request body should be a JSON object with the following structure:
```json
{
  "email": "string",
  "password": "string"
}
```

### Validation:
- `email`: Must be a valid email address.
- `password`: Must be at least 5 characters long.

### Responses:

#### Success (200):
```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string"
  }
}
```

#### Error (400):
```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

#### Error (401):
```json
{
  "message": "Invalid credentials"
}
```

### Example Request:
```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### Example Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

# Captain Login Endpoint Documentation

## Endpoint: `/captains/login`

### Method: POST

### Description:
This endpoint is used to log in an existing captain. It requires the captain's email and password.

### Request Body:
The request body should be a JSON object with the following structure:
```json
{
  "email": "string",
  "password": "string"
}
```

### Validation:
- `email`: Must be a valid email address.
- `password`: Must be at least 5 characters long.

### Responses:

#### Success (200):
```json
{
  "token": "string",
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  }
}
```

#### Error (400):
```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

#### Error (401):
```json
{
  "message": "Invalid credentials"
}
```

### Example Request:
```bash
curl -X POST http://localhost:3000/captains/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### Example Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

# User Profile Endpoint Documentation

## Endpoint: `/users/profile`

### Method: GET

### Description:
This endpoint is used to get the profile of the authenticated user.

### Headers:
- `Authorization`: Bearer token

### Responses:

#### Success (200):
```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "socketId": "string"
}
```

#### Error (401):
```json
{
  "message": "Unauthorized"
}
```

### Example Request:
```bash
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer <token>"
```

### Example Response:
```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null
}
```

# Captain Profile Endpoint Documentation

## Endpoint: `/captains/profile`

### Method: GET

### Description:
This endpoint is used to get the profile of the authenticated captain.

### Headers:
- `Authorization`: Bearer token

### Responses:

#### Success (200):
```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}
```

#### Error (401):
```json
{
  "message": "Unauthorized"
}
```

### Example Request:
```bash
curl -X GET http://localhost:3000/captains/profile \
-H "Authorization: Bearer <token>"
```

### Example Response:
```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "vehicle": {
    "color": "red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

# User Logout Endpoint Documentation

## Endpoint: `/users/logout`

### Method: GET

### Description:
This endpoint is used to log out the authenticated user.

### Headers:
- `Authorization`: Bearer token

### Responses:

#### Success (200):
```json
{
  "message": "Logged out successfully"
}
```

#### Error (401):
```json
{
  "message": "Unauthorized"
}
```

### Example Request:
```bash
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer <token>"
```

### Example Response:
```json
{
  "message": "Logged out successfully"
}
```

# Captain Logout Endpoint Documentation

## Endpoint: `/captains/logout`

### Method: GET

### Description:
This endpoint is used to log out the authenticated captain.

### Headers:
- `Authorization`: Bearer token

### Responses:

#### Success (200):
```json
{
  "message": "Logged out successfully"
}
```

#### Error (401):
```json
{
  "message": "Unauthorized"
}
```

### Example Request:
```bash
curl -X GET http://localhost:3000/captains/logout \
-H "Authorization: Bearer <token>"
```

### Example Response:
```json
{
  "message": "Logged out successfully"
}