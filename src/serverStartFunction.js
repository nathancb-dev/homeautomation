const System = require('./db/models/System');
const House = require('./db/models/House');
const Role = require('./db/models/Roles');
const User = require('./db/models/Users');

module.exports = async () => {

    if (!await System.findOne({}))
        await System.create({});

    if (!await House.findOne({}))
        await House.create({});

    let roleAdmin = await Role.findOne({ permissionLevel: 99 });
    if (!roleAdmin) {
        roleAdmin = await Role.create({ roleName: "Admin", permissionLevel: 99 });
        await System.findOneAndUpdate({}, { role: roleAdmin._id });
    }

    let user = await User.findOne({ roles: roleAdmin._id })
    if (!user) {
        user = await User.create({ username: "admin", password: "admin", name: "admin" });
        await System.findOneAndUpdate({}, { user: user._id });
    }
    await User.findByIdAndUpdate(user._id, { roles: [roleAdmin._id] });

    console.log("Inital data ok");
}