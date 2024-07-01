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
  async deleteUserByID(id) {
    return await axios.delete(API.users_user, {
      params: {
        id,
      },
    });
  }
  async getUserTypes(isUserIncluding = false) {
    return await axios.get(API.userTypes, {
      params: {
        userIncluding: isUserIncluding ? "true" : "false",
      },
    });
  }

  async createUserType(type, description) {
    return await axios.post(API.userTypes, {
      type,
      description,
    });
  }
  async updateUserType(id, type, description, color) {
    return await axios.put(API.userTypes, {
      id,
      type,
      description,
      color,
    });
  }
}

export default new UsersAPI();
