const express = require("express");
const http = require('http');

const app = express();
const appServer = http.createServer(app);
require("./scoker").startServer(appServer);

require("./mqtt").startServer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./serverStartFunction')();
require('./controllers/api')(app);

app.get("/", (req, res) => {
    res.send("OK");
})

appServer.listen(3000, () => { console.log("HTTP/WS server stared at port 3000. http://localhost:3000") });