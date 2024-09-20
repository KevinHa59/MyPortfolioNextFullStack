import GeneralsAPI from "./GeneralsAPI";
import PagesAPI from "./PagesAPI";
import PermissionsAPI from "./PermissionsAPI";
import ResumesAPI from "./ResumesAPI";
import UsersAPI from "./UsersAPI";
class MyAPIs {
  Resume() {
    return {
      getResumes: async (isQuantity = false) => {
        try {
          const res = await ResumesAPI.getResumes(isQuantity);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      getResumesByUser: async (userID, isQuantity = false) => {
        try {
          const res = await ResumesAPI.getResumesByUser(userID, isQuantity);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      getResumeByID: async (id) => {
        try {
          const res = await ResumesAPI.getResumeByID(id);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      createResume: async (userID, title) => {
        try {
          const res = await ResumesAPI.createResume(userID, title);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      updateResume: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResume(id, data);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeSections: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeSection(id, data);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeEducation: async (id, educations) => {
        try {
          const res = await ResumesAPI.updateResumeEducation(id, educations);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeEducation: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeEducation(id);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      getResumeCourse: async (name, rowsPerPage, pageSize, approved) => {
        try {
          const res = await ResumesAPI.getResumeCourse(
            name,
            rowsPerPage,
            pageSize,
            approved
          );
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      createResumeCourse: async (course, createdBy) => {
        try {
          const res = await ResumesAPI.createResumeCourse(course, createdBy);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      createResumeCourses: async (courses, createdBy) => {
        try {
          const res = await ResumesAPI.createResumeCourses(courses, createdBy);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeCourse: async (course) => {
        try {
          const res = await ResumesAPI.updateResumeCourse(course);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeCourses: async (courses) => {
        try {
          const res = await ResumesAPI.updateResumeCourses(courses);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeCourses: async (ids = []) => {
        try {
          const res = await ResumesAPI.deleteResumeCourses(ids);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeCertification: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeCertification(id, data);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeCertification: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeCertification(id);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeSkill: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeSkill(id, data);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeSkill: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeSkill(id);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeProject: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeProject(id, data);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeProject: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeProject(id);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeWork: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeWork(id, data);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeWork: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeWork(id);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeVolunteer: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeVolunteer(id, data);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeVolunteer: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeVolunteer(id);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeAward: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeAward(id, data);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeAward: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeAward(id);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeLanguage: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeLanguage(id, data);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeLanguage: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeLanguage(id);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      updateResumeHobby: async (id, data) => {
        try {
          const res = await ResumesAPI.updateResumeHobby(id, data);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeHobby: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeHobby(id);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
      deleteResumeByID: async (id) => {
        try {
          const res = await ResumesAPI.deleteResumeByID(id);
          return res;
        } catch (error) {
          console.error(error);
        }
      },
    };
  }
  User() {
    return {
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
          const res = await UsersAPI.updateUserType(
            id,
            type,
            description,
            color
          );
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
      updatePassword: async (email, password) => {
        try {
          const res = await UsersAPI.updatePassword(email, password);
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
  }
  Page() {
    return {
      getPages: async (isUserTypeIncluding = false, isQuantity = false) => {
        try {
          const res = await PagesAPI.getPages(isUserTypeIncluding, isQuantity);
          return res;
        } catch (error) {}
      },
      createPages: async (pages) => {
        try {
          const res = await PagesAPI.createPages(pages);
          return res;
        } catch (error) {}
      },
      savePage: async (path, description, id) => {
        try {
          const res = await PagesAPI.savePage(path, description, id);
          return res;
        } catch (error) {}
      },
      deletePage: async (id) => {
        try {
          const res = await PagesAPI.deletePage(id);
          return res;
        } catch (error) {
          return error.response;
        }
      },
    };
  }
  Permission() {
    return {
      getPermissionsByUserType: async (userTypeID) => {
        try {
          const res = await PermissionsAPI.getPermissionsByUserType(userTypeID);
          return res;
        } catch (error) {}
      },
      getPermissionsByPage: async (pageID) => {
        try {
          const res = await PermissionsAPI.getPermissionsByPage(pageID);
          return res;
        } catch (error) {}
      },
      createPermissions: async (links) => {
        try {
          const res = await PermissionsAPI.createPermissions(links);
          return res;
        } catch (error) {}
      },
      deletePermissions: async (ids) => {
        try {
          const res = await PermissionsAPI.deletePermissions(ids);
          return res;
        } catch (error) {}
      },
    };
  }
  Generals() {
    return {
      getUniversities: async (name, limit) => {
        try {
          const res = await GeneralsAPI.getUniversities(name, limit);
          return res;
        } catch (error) {}
      },
    };
  }
}

export default new MyAPIs();
