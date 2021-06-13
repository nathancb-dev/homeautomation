const mqtt_regex = require('mqtt-regex');
const io = require('../scoker').getIo();
const utils = require('../utils')
const state = require('../state');

module.exports = (aedes) => {

    aedes.on('subscribe', function (subscriptions, client) {
        console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
            '\x1b[0m subscribed to topics: ' + subscriptions.map(s => s.topic).join('\n'), 'from broker', aedes.id)
    })

    aedes.on('unsubscribe', function (subscriptions, client) {
        console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
            '\x1b[0m unsubscribed to topics: ' + subscriptions.join('\n'), 'from broker', aedes.id)
    })

    // fired when a client connects
    aedes.on('client', function (client) {
        console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
    })

    // fired when a client disconnects
    aedes.on('clientDisconnect', function (client) {
        if (!client) return;

        state.setDeviceDisconnected(client.id)

        console.log('Client Disconnected: \x1b[31m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
    })

    // fired when a message is published
    aedes.on('publish', async function (packet, client) {
        if (!client) return;

        console.log('Client \x1b[31m' + (client ? client.id : 'BROKER_' + aedes.id) + '\x1b[0m has published', packet.payload.toString(), 'on', packet.topic, 'to broker', aedes.id)

        const thingPublishValue = mqtt_regex('has/+type/+deviceInfoId/+thingInfoId').exec(packet.topic);

        /*
            thingPublishValue.type

            r: publish for device register
            b: publish from bridge
            d: publish from device

        */

        if (
            thingPublishValue &&
            thingPublishValue.deviceInfoId &&
            thingPublishValue.thingInfoId &&
            (
                thingPublishValue.type === 'r' ||
                thingPublishValue.type === 'b' ||
                thingPublishValue.type === 'd'
            )
        ) {

            utils.checkThingDeviceToCreate(thingPublishValue.deviceInfoId, thingPublishValue.thingInfoId);

            switch (thingPublishValue.type) {
                case 'r' || 'd':
                    state.setDeviceConnected(client.id, thingPublishValue.deviceInfoId);
                    break;
            }

            io.emit(packet.topic, packet.payload.toString());

        }

    })
}