import CredentialsAPI from "../CredentialsAPI";

export const Credential = {
  createCredential: async (userID) => {
    try {
      const res = await CredentialsAPI.createCredential(userID);
      return res;
    } catch (error) {}
  },
  updateCredential: async (id) => {
    try {
      const res = await CredentialsAPI.updateCredential(id);
      return res;
    } catch (error) {}
  },
  updateOrigins: async (id, origins) => {
    try {
      const res = await CredentialsAPI.updateOrigins(id, origins);
      return res;
    } catch (error) {}
  },
  deleteCredential: async (id) => {
    try {
      const res = await CredentialsAPI.deleteCredential(id);
      return res;
    } catch (error) {}
  },
};
