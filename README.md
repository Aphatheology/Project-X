# Project X
Project X is a sass software that helps marketplace enterprises to handle checkout. A unique feature of project X is its multi-user functionality which has allowed every department access and update inventory without delay. Roles are assigned to users  and permissions assigned to each role so users are able  to be able to execute different tasks depending on the permission assigned to their roles. 

The software will have a super admin(the business owner) who will be able to create new users, assign the new users to their roles with one or more permissions. 
NB:
1.  A user can only have one role. 
2. One role can have more than one or more permission(s)
 

## Main Requirement  
1. Sketch the ERDs that perfectly explains the multi-user system of the software showing the relationship  between the user, role and permissions table( use dbdiagram.io)
![Project-X ERD](<Project-X ERD.png>)
2. Write a register endpoint for super admin (business owner). Input data 
    1. Full name 
    2. Company Name 
    3. Email 
    4. Password 
3. Write an endpoint with which the super admin can add more users
    1. Full name 
    2. Email
4. Write a login endpoint for all the user types. 


## Built With
-   Node
-   Express
-   Postgres
-   Sequelize

## Quick Setup

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
# will run the server with node with env set to production
```
----------------------------------------------------------------------------------

## API DOCUMENTATION
List of all endpoints

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
    "role": "SUPER_ADMIN",
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
    "role": "USER",
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
    "email": "tamedo@gmail.com",
    "role": "USER"
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
    "email": "tamedo@gmail.com",
    "role": "USER"
  },
  "accessToken": "generatedToken"
}
```
