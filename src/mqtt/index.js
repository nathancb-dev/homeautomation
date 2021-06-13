const aedes = require('aedes')();
const mqttManager = require('./mqttManager');
const aedesServer = require('net').createServer(aedes.handle);

const startServer = () => {
    aedesServer.listen(1883, () => { console.log("MQTT server started at port 1883.") });
    mqttManager(aedes);
}

module.exports = {
    aedes,
    aedesServer,
    startServer
}