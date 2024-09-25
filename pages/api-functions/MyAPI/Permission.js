import PermissionsAPI from "../PermissionsAPI";

export const Permission = {
  getPermissionsByUserType: async (userTypeID) => {
    try {
      const res = await PermissionsAPI.getPermissionsByUserType(userTypeID);
      return res;
    } catch (error) {}
  },
  getPermissionsByPage: async (pageID) => {
    try {
      const res = await PermissionsAPI.getPermissionsByPage(pageID);
      return res;
    } catch (error) {}
  },
  createPermissions: async (links) => {
    try {
      const res = await PermissionsAPI.createPermissions(links);
      return res;
    } catch (error) {}
  },
  deletePermissions: async (ids) => {
    try {
      const res = await PermissionsAPI.deletePermissions(ids);
      return res;
    } catch (error) {}
  },
};
