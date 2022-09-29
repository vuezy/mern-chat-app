# MERN-CHAT-APP
A simple web-based chatting application built with MERN stack.

## Setup for backend
Go to `backend` directory and run `npm install` to install the dependencies.
Then, start the MongoDB database using `mongod` with the `--auth` option after setting up the user.

Next, create a `.env` file and put the following into it:
```
NODE_ENV=development
PORT=<port for your backend server>
DB_CONN_STRING='mongodb://<user>:<password>@<host>:<port>/<db name>?authSource=<auth source>'
```

Next, generate a `public/private keypair` with this command:
```
npm run genKeyPair
```

To reset your database, run this command:
```
npm run seed
```

#### Start the Express server
```
npm start
```


## Setup for frontend
Go to `frontend` directory and run `npm install` to install the dependencies.
Then, provide your Firebase configuration in `firebase.js` file.

#### Start the React server
```
npm start
```