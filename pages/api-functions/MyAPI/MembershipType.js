import MembershipTypesAPI from "../MembershipTypesAPI";

export const MembershipType = {
  getMembershipTypes: async () => {
    try {
      const res = await MembershipTypesAPI.getMembershipTypes();
      return res;
    } catch (error) {}
  },

  createMembershipType: async (
    type,
    cost,
    description,
    features,
    resumeSections
  ) => {
    try {
      const res = await MembershipTypesAPI.createMembershipType(
        type,
        cost,
        description,
        features,
        resumeSections
      );
      return res;
    } catch (error) {}
  },

  updateMembershipType: async (
    id,
    type,
    cost,
    description,
    features,
    resumeSections
  ) => {
    try {
      const res = await MembershipTypesAPI.updateMembershipType(
        id,
        type,
        cost,
        description,
        features,
        resumeSections
      );
      return res;
    } catch (error) {}
  },
};
