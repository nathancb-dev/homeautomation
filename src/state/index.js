const devicesUp = [];
const mqtt_clients = [];

module.exports = {
    devices: {
        deviceConnected(clientId, deviceInfoId) {

            if (devicesUp.findIndex(x => x.clientId === clientId && x.deviceInfoId === deviceInfoId) > -1)
                return;

            devicesUp.push(
                clientId,
                deviceInfoId
            );

        },
        deviceDisconnected(clientId) {
            const i = devicesUp.findIndex(x => x.clientId === clientId);
            if (i > -1)
                devicesUp.splice(i, 1);
        },
        getDevices() {
            return devicesUp;
        }
    },
    mqtt: {
        clientConnected(client) {
            mqtt_clients.push(client)
        },
        clientDisconnected(client) {
            const i = mqtt_clients.findIndex(x => x.id === client.id);
            console.log(mqtt_clients)
            if (i > -1)
                mqtt_clients.splice(i, 1);
        },
        getClients() {
            return mqtt_clients;
        }
    }
}