### Run server

#### Features

* Babel 7
* Environment Variables
* Express
* REST API
* MongoDB

#### Installation

* `cd server`
* `npm install`
* [start MongoDB](https://www.robinwieruch.de/mongodb-express-setup-tutorial/)
* `npm start`
* optional: include *.env* in your *.gitignore*

## Configuration

Make sure to add your own `MONGOURI` from your database in `config/keys.js`.

```javascript
module.exports = {
  mongoURI: "YOUR_MONGO_URI_HERE",
  secretOrKey: "secret"
};
```

Added Express server running on the port `3000`. Which is integrated with Node-Js, Mango-DB and Express. 

The `api` uri preceed all API endpoints and the following endpoints are currently available
* POST `/api/user/login`
* POST `/api/user/login`
* GET `/api/jokes`
* POST `/api/jokes`
* GET `/api/jokes/:joke_id`
* PUT `/api/jokes/:joke_id`
* DELETE `/api/contacts/:joke_id`
* POST `/api/delete`
* POST `/api/jokes/comments`
* POST `/api//jokes/addComment`
* POST `api/jokes/deleteComment`
