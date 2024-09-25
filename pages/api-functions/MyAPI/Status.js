import StatusAPI from "../StatusAPI";

export const Status = {
  getStatus: async () => {
    try {
      const res = await StatusAPI.getStatus();
      return res;
    } catch (error) {}
  },
  createStatus: async (name, color = null) => {
    try {
      const res = await StatusAPI.createStatus(name, color);
      return res;
    } catch (error) {}
  },
  updateStatus: async (id, name, color = null) => {
    try {
      const res = await StatusAPI.updateStatus(id, name, color);
      return res;
    } catch (error) {}
  },
  deleteStatus: async (ids) => {
    try {
      const res = await StatusAPI.deleteStatus(ids);
      return res;
    } catch (error) {}
  },
};
