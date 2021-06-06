const Role = require('../db/models/Roles');

module.exports = {

    updatePermissionsLevels: async (roleId, rolePermissionLevel) => {

        let roles = [];
        let permissionLevel = rolePermissionLevel;
        let updatedRole;

        const session = await Role.startSession();
        session.startTransaction();

        try {

            do {
                updatedRole = await Role.findOneAndUpdate(
                    {
                        _id: { $ne: (updatedRole ? updatedRole._id : roleId) },
                        permissionLevel: permissionLevel++
                    },
                    {
                        $inc: { permissionLevel: 1 }
                    },
                    {
                        new: true,
                        session
                    });

                if (updatedRole)
                    roles.push(updatedRole);

            } while (updatedRole);

            await session.commitTransaction();

        } catch (err) {

            await session.abortTransaction();
            throw err;

        } finally {

            session.endSession();

        }

        return roles;
    }

}