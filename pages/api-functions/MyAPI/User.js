import UsersAPI from "../UsersAPI";

export const User = {
  getUsers: async (isQuantity = false) => {
    try {
      const res = await UsersAPI.getUsers(isQuantity);
      return res;
    } catch (error) {}
  },
  getUserTypes: async (
    isUserIncluding = false,
    isPageIncluding = false,
    isQuantity = false
  ) => {
    try {
      const res = await UsersAPI.getUserTypes(
        isUserIncluding,
        isPageIncluding,
        isQuantity
      );
      return res;
    } catch (error) {}
  },
  createUserType: async (type, description) => {
    try {
      const res = await UsersAPI.createUserType(type, description);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  updateUserType: async (id, type, description, color) => {
    try {
      const res = await UsersAPI.updateUserType(id, type, description, color);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
  createUser: async (email, firstName, lastName, dob, password) => {
    try {
      const res = await UsersAPI.createUser(
        email,
        firstName,
        lastName,
        dob,
        password
      );
      return res;
    } catch (error) {}
  },
  updateUserMaster: async (userID, data) => {
    try {
      const res = await UsersAPI.updateUserMaster(userID, data);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  updateUserBasic: async (id, dob, cellPhone) => {
    try {
      const res = await UsersAPI.updateUserBasic(id, dob, cellPhone);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  updateUserAddress: async (id, address, city, state, country, zipCode) => {
    try {
      const res = await UsersAPI.updateUserAddress(
        id,
        address,
        city,
        state,
        country,
        zipCode
      );
      return res;
    } catch (error) {
      return error.response;
    }
  },
  updateUserSocial: async (
    id,
    linkedIn,
    github,
    twitter,
    facebook,
    instagram,
    portfolio
  ) => {
    try {
      const res = await UsersAPI.updateUserSocial(
        id,
        linkedIn,
        github,
        twitter,
        facebook,
        instagram,
        portfolio
      );
      return res;
    } catch (error) {
      return error.response;
    }
  },
  getUserByID: async (id) => {
    try {
      const res = await UsersAPI.getUserByID(id);
      return res;
    } catch (error) {}
  },
  getUserByEmail: async (email) => {
    try {
      const res = await UsersAPI.getUserByEmail(email);
      return res;
    } catch (error) {}
  },
  removeUserByID: async (id) => {
    try {
      const res = await UsersAPI.deleteUserByID(id);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  login: async (email, password) => {
    try {
      const res = await UsersAPI.login(email, password);
      return res;
    } catch (error) {}
  },
  updatePassword: async (email, password, currentPassword) => {
    try {
      const res = await UsersAPI.updatePassword(
        email,
        password,
        currentPassword
      );
      return res;
    } catch (error) {
      return error.response;
    }
  },
  updateType: async (userIDs, userTypeID) => {
    try {
      const res = await UsersAPI.updateType(userIDs, userTypeID);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  generateToken: async (email) => {
    try {
      const res = await UsersAPI.generateToken(email);
      return res;
    } catch (error) {}
  },
  refreshToken: async () => {
    try {
      const res = await UsersAPI.refreshToken();
      if (res.status === 201) {
        const data = res.data;
        return data.accessToken;
      } else {
        throw new Error("Failed to refresh access token");
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  },
};
