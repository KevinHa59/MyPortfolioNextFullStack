import AuthAPI from "../AuthAPI";

export const Auth = {
  verifyInstallation: async () => {
    try {
      const res = await AuthAPI.installation();
      return res;
    } catch (error) {}
  },
};
