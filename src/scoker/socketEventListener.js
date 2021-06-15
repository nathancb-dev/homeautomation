const { aedes } = require('../mqtt');

let events = {
    "has.teste": (args, arg2) => {
        console.log(args, arg2)
    }
}

const mqttPublish = (event, arg) => {

    console.log(arg)
    if (arg.topic && arg.payload) {
        console.log(arg)
        aedes.publish({
            cmd: 'publish',
            qos: 0,
            topic: arg.topic,
            payload: arg.payload, //new Buffer.from(arg.payload),
            retain: false
        });
    }
}

module.exports = (event, ...args) => {
    if (event === 'has/mqtt') {

        mqttPublish(event, ...args);

    } else {

        let f_event = events[event];
        if (f_event) return f_event(...args);

    }
}