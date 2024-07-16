import PagesAPI from "./PagesAPI";
import PermissionsAPI from "./PermissionsAPI";
import ResumesAPI from "./ResumesAPI";
import UsersAPI from "./UsersAPI";
class MyAPIs {
  Resume() {
    return {
      getResumes: async () => {
        try {
          const res = await ResumesAPI.getResumes();
          return res?.data || [];
        } catch (error) {
          console.error(error);
        }
      },
      getResumeByID: async (id) => {
        try {
          const res = await ResumesAPI.getResumeByID(id);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResume: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResume(id, data);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeEducation: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeEducation(id, data);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeCertification: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeCertification(id, data);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeSkill: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeSkill(id, data);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeProject: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeProject(id, data);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeWork: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeWork(id, data);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeWork: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeWork(id);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeVolunteer: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeVolunteer(id, data);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeVolunteer: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeVolunteer(id);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeAward: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeAward(id, data);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeAward: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeAward(id);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeLanguage: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeLanguage(id, data);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeLanguage: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeLanguage(id);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeHobby: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeHobby(id, data);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeHobby: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeHobby(id);
          return res?.data;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeByID: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeByID(id);
          return res?.data;
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
          return res?.data || [];
        } catch (error) {}
      },
      getUserTypes: async (
        isUserIncluding = false,
        isPageIncluding = false
      ) => {
        try {
          const res = await UsersAPI.getUserTypes(
            isUserIncluding,
            isPageIncluding
          );
          return res?.data || [];
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
          return res?.data;
        } catch (error) {}
      },
      getUserByID: async (id) => {
        try {
          const res = await UsersAPI.getUserByID(id);
          return res?.data;
        } catch (error) {}
      },
      login: async (email, password) => {
        try {
          const res = await UsersAPI.login(email, password);
          return res?.data;
        } catch (error) {}
      },
      updatePassword: async (email, password) => {
        try {
          const res = await UsersAPI.updatePassword(email, password);
          return res?.data;
        } catch (error) {}
      },
      generateToken: async (email) => {
        try {
          const res = await UsersAPI.generateToken(email);
          return res?.data;
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
  }
  Page() {
    return {
      getPages: async (isUserTypeIncluding = false) => {
        try {
          const res = await PagesAPI.getPages(isUserTypeIncluding);
          return res?.data || [];
        } catch (error) {}
      },
      createPages: async (pages) => {
        try {
          const res = await PagesAPI.createPages(pages);
          return res?.data || [];
        } catch (error) {}
      },
      savePage: async (path, description, id) => {
        try {
          const res = await PagesAPI.savePage(path, description, id);
          return res?.data || [];
        } catch (error) {}
      },
      deletePage: async (id) => {
        try {
          const res = await PagesAPI.deletePage(id);
          return res?.data || [];
        } catch (error) {}
      },
    };
  }
  Permission() {
    return {
      getPermissionsByUserType: async (userTypeID) => {
        try {
          const res = await PermissionsAPI.getPermissionsByUserType(userTypeID);
          return res?.data || [];
        } catch (error) {}
      },
      getPermissionsByPage: async (pageID) => {
        try {
          const res = await PermissionsAPI.getPermissionsByPage(pageID);
          return res?.data || [];
        } catch (error) {}
      },
      createPermissions: async (links) => {
        try {
          const res = await PermissionsAPI.createPermissions(links);
          return res?.data || [];
        } catch (error) {}
      },
      deletePage: async (ids) => {
        try {
          const res = await PermissionsAPI.deletePermissions(ids);
          return res?.data || [];
        } catch (error) {}
      },
    };
  }
}

export default new MyAPIs();
