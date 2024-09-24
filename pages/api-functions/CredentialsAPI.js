import axios from "axios";

axios.defaults.withCredentials = true;
const API = {
  credential: "/api/credentials",
  credential_origins: "/api/credentials/origins",
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
  async updateCredential(id) {
    return await axios.put(
      API.credential,
      {
        id,
      },
      { timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT }
    );
  }
  async updateOrigins(id, origins) {
    return await axios.put(
      API.credential_origins,
      {
        id,
        origins,
      },
      { timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT }
    );
  }
  async deleteCredential(id) {
    return await axios.delete(API.credential, {
      params: {
        id,
      },
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
    });
  }
}

export default new CredentialsAPI();
