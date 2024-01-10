# Project X

## Built With

-   Node
-   Express
-   Postgres
-   Sequelize

## Quick Start

Clone the repo:

```bash
git clone https://github.com/Aphatheology/Project-X.git
cd Project-X
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .envExample .env

# open .env and modify the environment variables
```

To run the project:

```bash
npm run dev
# will run the server with nodemon

npm run start
# will run the server with node
```

Now that we’ve learned about the anatomy of our endpoints and the different request methods that we should use, it’s time for some examples:

| Method | URL                      | Description                               |
| ------ | ------------------------ | ----------------------------------------- |
| `POST` | `/api/auth/register`     | Register a new SUPER_ADMIN                |
| `POST` | `/api/auth/login`        | Login endpoint for all type of users      |
| `POST` | `/api/auth/set-password` | Endpoint for users to set their password  |
| `POST` | `/api/users`             | Endpoint for SUPER_ADMIN to create a user |

## REGISTER AS SUPER ADMIN

```http
POST /api/auth/register
```

### Request Body

| Parameter     | Type     | Description                                              |
| :------------ | :------- | :------------------------------------------------------- |
| `fullName`    | `string` | **Required**                                             |
| `companyName` | `string` | **Required**                                             |
| `email`       | `string` | **Required - Valid Email**                               |
| `password`    | `string` | **Required - Minimum 8, containing letters and numbers** |

#### Example

```javascript
{
  "fullName": "Lagbaja Admin",
  "companyName": "Lagbaja Enterprises",
  "email": "lagbaja@gmail.com",
  "password": "*****************"
}
```

### Responses

#### Request body validation error

```javascript
{
  "code": 400 - Bad Request,
  "message": "\"email\" must be a valid email, password must be at least 8 characters, \"roleName\" is not allowed"
}
```

#### Email already exist error response

```javascript
{
  "code": 400 - Bad Request,
  "message": "Email already taken"
}
```

#### Success Response

```javascript
{
  "user": {
    "id": 1,
    "email": "lagbaja@gmail.com",
    "fullName": "Lagbaja Admin",
    "companyName": "Lagbaja Enterprises",
    "password": "$2b$08$5dgEFkEQQ0nLh.A3yNEO9.Ae0odawikkIzglt/Iq7chsNFpYv8W8W",
    "roleName": "SUPER_ADMIN",
    "updatedAt": "2024-01-10T18:27:35.681Z",
    "createdAt": "2024-01-10T18:27:35.681Z"
  },
  "accessToken": "generatedToken"
}
```

## SUPER ADMIN CREATE USER

```http
POST /api/users
```

### Request

| Parameter       | Type           | Description                |
| :-------------- | :------------- | :------------------------- |
| `fullName`      | `string`       | **Required**               |
| `email`         | `string`       | **Required - Valid Email** |
| `Authorization` | `Bearer Token` | **Required - JWT**         |

#### Example

```javascript
{
  "fullName": "Tamedo Staff",
  "email": "tamedo@gmail.com",
}
```

### Responses

#### Request body validation error

```javascript
{
  "code": 400 - Bad Request,
    "message": "\"email\" must be a valid email, \"password\" is not allowed, \"companyName\" is not allowed"
}
```

#### Unauthorized error

When a user tried to access the create user endpoint

```javascript
{
  "code": 403 - Unauthorized,
  "message": "You do not have the required permissions"
}
```

#### Email already exist error response

```javascript
{
  "code": 400 - Bad Request,
  "message": "Email already taken"
}
```

#### Success Response

```javascript
{
  "message": "User created successfully, they will receive an email to set their password",
  "user": {
    "id": 2,
    "email": "tamedo@gmail.com",
    "fullName": "Tamedo Staff",
    "roleName": "USER",
    "updatedAt": "2024-01-10T18:28:58.665Z",
    "createdAt": "2024-01-10T18:28:58.665Z",
    "companyName": null,
    "password": null
  }
}
```

## LOGIN FOR ALL USERS

```http
POST /api/auth/login
```

### Request

| Parameter  | Type     | Description                                              |
| :--------- | :------- | :------------------------------------------------------- |
| `email`    | `string` | **Required - Valid Email**                               |
| `password` | `string` | **Required - Minimum 8, containing letters and numbers** |

#### Example

```javascript
{
  "email": "lagbaja@gmail.com",
  "password": "**********"
}
```

### Responses

#### Request body validation error

```javascript
{
  "code": 400 - Bad Request,
  "message": "\"email\" must be a valid email, password must be at least 8 characters"
}
```

#### Email already exist error response

```javascript
{
  "code": 401 - Unauthorized,
  "message": "Incorrect email or password"
}
```

#### Success Response

```javascript
{
  "user": {
    "id": 2,
    "fullName": "Tamedo Staff",
    "companyName": null,
    "email": "tamedo@gmail.com",
    "password": "$2b$08$r25M2aj6N9uiMWmPaV2JhOTkurryg8SuPtORvrpW17zM8Ijwzvj22",
    "createdAt": "2024-01-10T13:59:32.128Z",
    "updatedAt": "2024-01-10T15:07:04.086Z",
    "roleName": "USER"
  },
  "accessToken": "generatedToken"
"
}
```

## SET PASSWORD FOR USERS

```http
POST /api/auth/set-password?token=
```

### Request

| Parameter  | Type     | Description                                              |
| :--------- | :------- | :------------------------------------------------------- |
| `password` | `string` | **Required - Minimum 8, containing letters and numbers** |
| `token`    | `JWT`    | **Required - query**                                     |

#### Example

```http
POST /api/auth/set-password?token=jwtTokenFromEmail
```

```javascript
{
  "password": "**********"
}
```

### Responses

#### Request body validation error

```javascript
{
  "password": "**********"
}
```

#### Success Response

```javascript
{
  "user": {
    "id": 2,
    "fullName": "Tamedo Staff",
    "companyName": null,
    "email": "tamedo@gmail.com",
    "password": "$2b$08$zEwSR6SOPAYikK.3A1FT9O6ZzPiLT/Nu33xwf0pCEHhUiQvOyaJly",
    "createdAt": "2024-01-10T18:28:58.665Z",
    "updatedAt": "2024-01-10T18:28:58.665Z",
    "roleName": "USER"
  },
  "accessToken": "generatedToken"
}
```
