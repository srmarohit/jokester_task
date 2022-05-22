
# CRUD BACKEND API

THis represents a API to communicate with database to operate few tasks such as create user, login user, view user, delete user, find user, find all users, upload file etc. 



## Tech Stack

**Server:** Node, Express, MongoDB, Multer, JWT etc.


## Schema for User Model

```javascript
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

```


## API Reference

#### Get all Users

```http
  GET /api/user/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. for Admin |

#### Get user

```http
  GET /api/user/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

#### Update User

```http
  PUT /api/user/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to update |

#### Delete user

```http
  DELETE /api/user/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to delete |

#### Register user

```http
  POST /api/auth/register
```

| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`       | `string` | **Required**.  |
| `email`      | `string` | **Required**.  |
| `password`   | `string` | **Required**.  |


#### Login user

```http
  POST /api/auth/login
```

| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**.  |
| `password`   | `string` | **Required**.  |


This API helps you to perform all the given tasks.


## Installation and Execution 

To run this project on your machine

```bash
  git clone https://github.com/srmarohit/jokester_task/tree/server/
```


```bash
  npm install
```


```bash
  npm run dev
```

   or


```bash
  npm start
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_DB_URI`

`PORT`

`JWT_SEC_KEY`


## Authors

- [ROHIT SHARMA](https://www.github.com/srmarohit)

