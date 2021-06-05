const Role = require('./db/models/Roles');

module.exports = async () => {
    await Role.find({});
    console.log("Inital data ok");
}