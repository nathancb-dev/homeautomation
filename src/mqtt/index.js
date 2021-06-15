const aedes = require('aedes')();
const aedesServer = require('net').createServer(aedes.handle);

const startServer = () => {
    aedesServer.listen(1883, () => { console.log("MQTT server started at port 1883.") });
    console.log("Aedes mqtt server instantiated");
}

const addManager = () => {
    require('./mqttManager')(aedes);
    console.log("Aedes mqtt manager added");
}

module.exports = {
    startServer,
    aedes,
    aedesServer,
    addManager
}