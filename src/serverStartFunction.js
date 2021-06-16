const System = require('./db/models/System');
const House = require('./db/models/House');
const Role = require('./db/models/Roles');
const User = require('./db/models/Users');

module.exports = async () => {

    let system = await System.findOne({});
    if (!system)
        system = await System.create({});

    if (!await House.findOne({}))
        await House.create({});

    let role = await Role.findById(system.role);
    if (!role) {
        role = await Role.create({ roleName: "System", permissionLevel: 99 });
        await System.findOneAndUpdate({}, { role: role._id });
    }

    if (!await User.findById(system.user)) {
        const user = await User.create({ username: "admin", password: "admin", name: "Administrator", roles: [role._id] });
        await System.findOneAndUpdate({}, { user: user._id });
    }

    console.log("Initial database data OK");
}