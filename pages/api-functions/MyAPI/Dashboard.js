import DashboardAPI from "../DashboardAPI";

export const Dashboard = {
  getDashboard: async () => {
    try {
      const res = await DashboardAPI.getDashboard();
      return res;
    } catch (error) {}
  },
};
