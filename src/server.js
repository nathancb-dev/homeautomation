const express = require("express");
const http = require('http');
const mqtt = require("./mqtt");
const socker = require("./scoker");

mqtt.createServer();

const app = express();
const appServer = http.createServer(app);
socker.createServer(appServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./serverStartFunction')();
require('./controllers/api')(app);

app.get("/", (req, res) => {
    res.send("OK");
})

appServer.listen(3000, () => { console.log("HTTP/WS server stared at port 3000. http://localhost:3000") });