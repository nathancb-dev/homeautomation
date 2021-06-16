const aedes = require('aedes')();
const aedesServer = require('net').createServer(aedes.handle);

const startServer = () => {
    const mqtt_port = process.env.MQTT_PORT ? process.env.MQTT_PORT : 1883;
    aedesServer.listen(mqtt_port, () => { console.log(`MQTT server started at port ${mqtt_port}. mqtt://localhost:${mqtt_port}`) });
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