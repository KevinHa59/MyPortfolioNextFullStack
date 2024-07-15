import axios from "axios";

axios.defaults.withCredentials = true;
const API = {
  permissions: "/api/permissions",
};

class PermissionsAPI {
  async createPermissions(links) {
    return await axios.post(
      API.permissions,
      {
        links,
      },
      { timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT }
    );
  }
  // if id is given, perform update, otherwise, create
  async deletePermissions(ids) {
    return await axios.delete(API.permissions, {
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
      params: {
        id: ids.join(","),
      },
    });
  }
}

export default new PermissionsAPI();
