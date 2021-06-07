const express = require("express");
const http = require('http');
const socker = require("./scoker")

const app = express();
const server = http.createServer(app);
socker(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./serverStartFunction')();
require('./controllers/api')(app);

app.get("/", (req, res) => {
    res.send("OK");
})

server.listen(3000, () => { console.log("server stared at port 3000. http://localhost:3000") });