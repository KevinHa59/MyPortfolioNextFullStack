import axios from "axios";

axios.defaults.withCredentials = true;
const API = {
  universities: "/api/generals/universities",
};

class GeneralsAPI {
  async getUniversities(name, limit = null) {
    return await axios.get(API.universities, {
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
      params: {
        name,
        limit,
      },
    });
  }
}

export default new GeneralsAPI();
