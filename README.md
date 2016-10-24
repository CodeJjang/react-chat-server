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

For development, place a `local.js` file containing the app's local & sensitive information under `config/` in the following format:  
```
module.exports = {
    connections: {
        mongoDb: {
        	host: // mongo host
        	port: // mongo port
        	database: // mongo database name
            user: // username to mongo
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