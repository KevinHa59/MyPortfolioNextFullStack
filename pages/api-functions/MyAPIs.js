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
      updateResumeProject: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeProject(id, data);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeWork: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeWork(id, data);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeWork: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeWork(id);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeVolunteer: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeVolunteer(id, data);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeVolunteer: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeVolunteer(id);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeAward: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeAward(id, data);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeAward: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeAward(id);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeLanguage: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeLanguage(id, data);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeLanguage: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeLanguage(id);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeHobby: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeHobby(id, data);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeHobby: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeHobby(id);
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
      createUser: async (
        email,
        firstName,
        lastName,
        dob,
        password,
        userTypeID
      ) => {
        try {
          const res = await UsersAPI.createUser(
            email,
            firstName,
            lastName,
            dob,
            password,
            userTypeID
          );
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
