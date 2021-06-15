const express = require("express");
const http = require('http');
const socker = require("./scoker");
const mqtt = require("./mqtt");

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

app.get("/", (req, res) => {
    res.send("OK");
})

appServer.listen(3000, () => { console.log("HTTP/WS server stared at port 3000. http://localhost:3000") });