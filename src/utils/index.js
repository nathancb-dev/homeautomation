const Role = require('../db/models/Roles');

module.exports = {

    updatePermissionsLevels: async (roleId, rolePermissionLevel) => {

        let roles = [];
        let permissionLevel = rolePermissionLevel;
        let updatedRole;

        do {
            updatedRole = await Role.findOneAndUpdate({ _id: { $ne: (updatedRole ? updatedRole._id : roleId) }, permissionLevel: permissionLevel++ }, { $inc: { permissionLevel: 1 } }, { new: true });
            if (updatedRole)
                roles.push(updatedRole);

        } while (updatedRole);

        return roles;
    }

}