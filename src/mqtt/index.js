const aedes = require('aedes')();
const mqttManager = require('./mqttManager')

let aedesServer;

const createServer = () => {
    aedesServer = require('net').createServer(aedes.handle);
    aedesServer.listen(1883, () => { console.log("MQTT server started at port 1883.") });
    mqttManager(aedes);
}

module.exports = {
    aedes,
    createServer,
    aedesServer
}