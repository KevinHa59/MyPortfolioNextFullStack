import axios from "axios";
import jwt from "../../utils/jwt";

const API = {
  users: "/api/users",
  users_user: "/api/users/user",
  userTypes: "/api/userTypes",
};

class UsersAPI {
  async getUsers() {
    return await axios.get(API.users);
  }
  async createUser(email, firstName, lastName, dob, password, userTypeID) {
    const jwtPassword = jwt.generateToken({ password: password });
    return await axios.post(API.users, {
      email,
      firstName,
      lastName,
      dob,
      password: jwtPassword,
      userTypeID,
    });
  }
  async getUserByID(id) {
    return await axios.get(API.users_user, {
      params: {
        id,
      },
    });
  }
  async getUserTypes() {
    return await axios.get(API.userTypes);
  }
}

export default new UsersAPI();
