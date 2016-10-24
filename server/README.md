## Setup
You may set the following environment variables:  
```
NODE_ENV
PORT
MONGO_HOST
MONGO_PORT
MONGO_DATABASE
MONGO_USERNAME
MONGO_PASSWORD
FRONTEND_URL
```

At last, place a `local.js` file containing the app's sensitive information under `config/` in the following format:  
```
module.exports = {
    connections: {
        mongoDb: {
            user // username to mongo
            password: // password to mongo
        }
    },

    session: {
        url // connection string to database
    }
}
```

## Usage
```
npm install -g sails
sails lift
```