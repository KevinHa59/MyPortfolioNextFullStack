import ResumesAPI from "./ResumesAPI";
import UsersAPI from "./UsersAPI";
class MyAPIs {
  Resume() {
    return {
      getResumes: async () => {
        try {
          const res = await ResumesAPI.getResumes();
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      getResumeByID: async (id) => {
        try {
          const res = await ResumesAPI.getResumeByID(id);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResume: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResume(id, data);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeEducation: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeEducation(id, data);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeCertification: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeCertification(id, data);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeSkill: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeSkill(id, data);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeByID: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeByID(id);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
    };
  }
  User() {
    return {
      getUsers: async () => {
        try {
          const res = await UsersAPI.getUsers();
          return res.data;
        } catch (error) {}
      },
      getUserByID: async (id) => {
        try {
          const res = await UsersAPI.getUserByID(id);
          return res.data;
        } catch (error) {}
      },
    };
  }
}

export default new MyAPIs();
