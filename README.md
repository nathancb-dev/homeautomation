
HAS - Home Automation system
=============================

## Requirements

- Node / npm
- MongoDB

## Installation

```bash
# navigate to project folder
cd homeautomation-server

# install server depedencies
npm install # or npm i

# navigate to react client
cd client

# install client depedencies
npm install # or npm i
```

## .env

### Structure

\<variable\>
\:default_value

```sh
NODE_ENV=<dev> or <prd> :prd
MONGO_URL=<mongodb_url:mongodb://localhost/homeautomation>
DEV_SERVER_PORT=<port:3001>
MQTT_PORT=<port:1883>
```

Example

```sh
NODE_ENV=prd
MONGO_URL=mongodb://localhost/homeautomation
DEV_SERVER_PORT=3001
MQTT_PORT=1883
```

## Start dev server

### Api server

```bash
# navigate to project folder
cd homeautomation-server

# start api dev server
npm run dev
```

### React client WEB server

Obs: The react server always starts in port `3000`

If the API server and the react server are started, the api can be tested through the react server port (because the proxy)

```bash
# navigate to client folder
cd client

# start react dev server
npm start
```

> If the `DEV_SERVER_PORT` in `.env` is changed, it must also be changed in the `proxy` variable in `package.json` in `client` folder

```javascript
// client/package.json

...
    "scripts": {
        ...
    },
    "proxy": "http://localhost:<port:3001>",
...
```

Example

```javascript
// client/package.json

...
    "scripts": {
        ...
    },
    "proxy": "http://localhost:3001",
...
```

## Build to production server

Build and start server

```bash
# navigate to project folder
cd homeautomation-server

# install server/client depedencies and build
npm run build

# run server
npm start
```

If in production `.env` is being used, `NODE_ENV` must be changed to "`prd`" or deleted for the server to use the default option ("`prd`")

```sh
NODE_ENV=prd
```