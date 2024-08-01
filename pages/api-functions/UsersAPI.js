import axios from "axios";
import jwt from "../../utils/jwtUtil";
axios.defaults.withCredentials = true;
const API = {
  users: "/api/users",
  users_user: "/api/users/user",
  users_user_password: "/api/users/user/password",
  users_user_token: "/api/users/user/token",
  users_user_token_refresh: "/api/users/user/token/refresh",
  userTypes: "/api/userTypes",
  login: "/api/authentication/login",
};

class UsersAPI {
  async getUsers(isQuantity = false) {
    return await axios.get(API.users, {
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
      params: {
        isQuantity: isQuantity ? "1" : "0",
      },
    });
  }
  async createUser(email, firstName, lastName, dob, password, userTypeID) {
    return await axios.post(API.users, {
      email,
      firstName,
      lastName,
      dob,
      password,
      userTypeID,
    });
  }
  async getUserByID(id) {
    return await axios.get(API.users_user, {
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
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
  async updateUserBasic(id, dob, cellPhone, homePhone) {
    return await axios.put(API.users_user, {
      id,
      dob,
      cellPhone,
      homePhone,
    });
  }
  async updateUserAddress(id, address, city, state, country, zipCode) {
    return await axios.put(API.users_user, {
      id,
      address,
      city,
      state,
      country,
      zipCode,
    });
  }
  async updateUserSocial(
    id,
    linkedIn,
    github,
    twitter,
    facebook,
    instagram,
    portfolio
  ) {
    return await axios.put(API.users_user, {
      id,
      linkedIn,
      github,
      twitter,
      facebook,
      instagram,
      portfolio,
    });
  }
  async getUserTypes(
    isUserIncluding = false,
    isPageIncluding = false,
    isQuantity = false
  ) {
    return await axios.get(API.userTypes, {
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
      params: {
        userIncluding: isUserIncluding ? "true" : "false",
        pageIncluding: isPageIncluding ? "true" : "false",
        isQuantity: isQuantity ? "1" : "0",
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
  async updatePassword(email, password) {
    return await axios.put(API.users_user_password, {
      email,
      password,
    });
  }
  async generateToken(email) {
    return await axios.put(API.users_user_token, {
      email,
    });
  }
  async refreshToken() {
    return await axios.post(API.users_user_token_refresh);
  }
  async login(email, password) {
    return await axios.post(API.login, {
      email,
      password,
    });
  }
}

export default new UsersAPI();
