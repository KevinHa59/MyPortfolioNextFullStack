import axios from "axios";

axios.defaults.withCredentials = true;
const API = {
  membershipTypes: "/api/membership-types",
};

class MembershipTypesAPI {
  async getMembershipTypes() {
    return await axios.get(API.membershipTypes, {
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
    });
  }

  async createMembershipType(
    type,
    cost,
    description,
    features = null,
    resumeSections = null
  ) {
    return await axios.post(
      API.membershipTypes,
      {
        type,
        cost,
        description,
        features,
        resumeSections,
      },
      { timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT }
    );
  }

  async updateMembershipType(
    id,
    type,
    cost,
    description,
    features = null,
    resumeSections = null
  ) {
    return await axios.put(
      API.membershipTypes,
      {
        id,
        type,
        cost,
        description,
        features,
        resumeSections,
      },
      { timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT }
    );
  }
}

export default new MembershipTypesAPI();
