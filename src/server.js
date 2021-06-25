require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const socker = require('./scoker');
const mqtt = require('./mqtt');

const app = express();
const appServer = http.createServer(app);

socker.startServer(appServer);
mqtt.startServer();
socker.addManager();
mqtt.addManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./serverStartFunction')();
require('./controllers')(app);

if (process.env.NODE_ENV === "prd") {

    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
        res.send({ server: "OK" });
    });

    app.use(express.static(path.resolve(__dirname, '../client-test/build')));

}

const server_port = process.env.NODE_ENV === "prd" ? 80 : process.env.DEV_SERVER_PORT ? process.env.DEV_SERVER_PORT : 3001;
appServer.listen(server_port, () => {
    console.log(`HTTP/WS server stared at port ${server_port}. http://localhost:${server_port}`)
});