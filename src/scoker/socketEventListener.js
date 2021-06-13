let events = {
    "has.teste": (args, arg2) => {
        console.log(args, arg2)
    }
}

module.exports = (event, ...args) => {
    let f_event = events[event];
    if (f_event) return f_event(...args);
}