import axios from "axios";

axios.defaults.withCredentials = true;
const API = {
  status: "/api/status",
};

class StatusAPI {
  async getStatus() {
    return await axios.get(API.status, {
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
    });
  }
  async createStatus(name, color = null) {
    return await axios.post(
      API.status,
      {
        name,
        color,
      },
      {
        timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
      }
    );
  }
  async updateStatus(id, name, color = null) {
    return await axios.put(
      API.status,
      {
        id,
        name,
        color,
      },
      { timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT }
    );
  }
  // if id is given, perform update, otherwise, create
  async deleteStatus(ids) {
    return await axios.delete(API.status, {
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
      params: {
        ids: ids.join(","),
      },
    });
  }
}

export default new StatusAPI();
