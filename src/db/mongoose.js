const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect("mongodb://localhost/homeautomation")
    .then(() => {
        console.log(`connection to database established`)
    }).catch(err => {
        console.log(`db error ${err.message}`);
        process.exit(-1)
    });

mongoose.Promise = global.Promise;

module.exports = mongoose;