const System = require('./db/models/System');
const House = require('./db/models/House');
const Role = require('./db/models/Roles');
const User = require('./db/models/Users');

module.exports = async () => {

    if (!await System.findOne({}))
        await System.create({});

    if (!await House.findOne({}))
        await House.create({});

    if (true === false) {
        if (!await Role.findOne({}))
            await Role.create({ roleName: "admin", permissionLevel: 99 });

        if (!await User.findOne({}))
            await User.create({ username: "admin", password: "admin", name: "admin" });
    }

    console.log("Inital data ok");
}