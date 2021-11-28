require('dotenv').config();

console.log('\n ENV - ' + (!process.env.NODE_ENV || process.env.NODE_ENV === "prd" ? 'PRD' : 'DEV') + '\n');

const express = require('express');
const fs = require('fs');
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

if (!process.env.NODE_ENV || process.env.NODE_ENV === "prd") {

    try {

        let path_index = path.resolve(__dirname, '../client/build', 'index.html');

        if (fs.existsSync(path_index)) {

            app.get("/", (req, res) => {
                res.sendFile(path_index);
            });

        }else{

            console.error('PRD - FILE: index.html file not found (Build file and restart server): ' + path_index);

            app.get("/", (req, res) => {
                res.send({error: 'index.html file not found'});
            });

            app.use(express.static(path.resolve(__dirname, '../client-test/build')));

        }

      } catch(err) {

        console.error(err);

      }

}

const server_port = !process.env.NODE_ENV || process.env.NODE_ENV === "prd" ? 80 : process.env.DEV_SERVER_PORT ? process.env.DEV_SERVER_PORT : 3001;
appServer.listen(server_port, () => {
    console.log(`HTTP/WS server stared at port ${server_port}. http://localhost:${server_port}`)
});