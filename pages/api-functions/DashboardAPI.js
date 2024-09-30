import axios from "axios";

axios.defaults.withCredentials = true;
const API = {
  dashboard: "/api/dashboard",
};

class DashboardAPI {
  async getDashboard() {
    return await axios.get(API.dashboard, {
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
    });
  }
}

export default new DashboardAPI();
