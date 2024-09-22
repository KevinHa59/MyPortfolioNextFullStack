import axios from "axios";

axios.defaults.withCredentials = true;
const API = {
  installation: "/api/auth/installation",
};

class AuthAPI {
  async installation() {
    return await axios.get(API.installation, {
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
    });
  }
}

export default new AuthAPI();
