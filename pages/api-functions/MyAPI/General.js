import GeneralsAPI from "../GeneralsAPI";

export const General = {
  getUniversities: async (name, limit) => {
    try {
      const res = await GeneralsAPI.getUniversities(name, limit);
      return res;
    } catch (error) {}
  },
};
