const Role = require('../db/models/Roles');
const Device = require('../db/models/Devices');
const Thing = require('../db/models/Things');

module.exports = {

    updatePermissionsLevels: async (roleId, rolePermissionLevel) => {

        let roles = [];
        let permissionLevel = rolePermissionLevel;
        let updatedRole;

        try {

            do {
                updatedRole = await Role.findOneAndUpdate(
                    {
                        _id: { $ne: (updatedRole ? updatedRole._id : roleId) },
                        permissionLevel: permissionLevel++
                    },
                    {
                        permissionLevel
                    },
                    {
                        new: true,
                        runValidators: true
                    });

                if (updatedRole)
                    roles.push(updatedRole);

            } while (updatedRole);

        } catch (err) {

            for (const k in updatedRole) {
                const role = updatedRole[k];

                await Role.findOneAndUpdate(
                    {
                        _id: role._id,
                    },
                    {
                        $inc: { permissionLevel: -1 }
                    });

            }

            throw err;
        }

        return roles;
    },

    async checkThingDeviceToCreate(deviceInfoId, thingInfoId) {

        if (!await Thing.findOne({ thingInfoId })) {

            let device = await Device.findOne({ deviceInfoId });

            if (!device) {
                device = await Device.create({ deviceInfoId });
            }

            await Thing.create({
                thingInfoId,
                device: device._id
            })

        }

    }

}