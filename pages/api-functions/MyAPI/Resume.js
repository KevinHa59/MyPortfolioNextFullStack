import ResumesAPI from "../ResumesAPI";

export const Resume = {
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
