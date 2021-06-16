const { aedes } = require('../mqtt');

let events = {
    "has.teste": (args, arg2) => {
        console.log(args, arg2)
    }
}

const mqttPublish = (arg) => {
    if (arg.topic && arg.payload) {
        aedes.publish({
            cmd: 'publish',
            qos: (arg.qos ? arg.qos : 0),
            topic: arg.topic,
            payload: arg.payload, //new Buffer.from(arg.payload),
            retain: false
        });
    }
}

module.exports = (event, ...args) => {
    if (event === 'has/mqtt') {

        mqttPublish(...args);

    } else {

        let f_event = events[event];
        if (f_event) return f_event(...args);

    }
}