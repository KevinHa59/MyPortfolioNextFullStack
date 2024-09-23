import axios from "axios";

axios.defaults.withCredentials = true;
const API = {
  credential: "/api/credentials",
};

class CredentialsAPI {
  async createCredential(userID) {
    return await axios.post(
      API.credential,
      {
        userID,
      },
      { timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT }
    );
  }
}

export default new CredentialsAPI();
