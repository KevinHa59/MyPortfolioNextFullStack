import axios from "axios";

const API = {
  resumes: "/api/resumes",
  resumes_resume: "/api/resumes/resume",
  resumes_resume_education: "/api/resumes/resume/education",
};

class ResumesAPI {
  async getResumes() {
    return await axios.get(API.resumes);
  }
  async createResume(userID, title) {
    return await axios.post(API.resumes, {
      userID,
      title,
    });
  }
  async getResumeByID(id) {
    return await axios.get(API.resumes_resume, {
      params: {
        id,
      },
    });
  }
  async deleteResumeByID(id) {
    return await axios.delete(API.resumes_resume, {
      params: {
        id,
      },
    });
  }
  async updateResume(id, data) {
    return await axios.put(API.resumes_resume, {
      id: id,
      ...data,
    });
  }
  // async updateResume(id, data) {
  //   return await axios.put(API.resumes_resume, {
  //     id: id,
  //     ...data,
  //   });
  // }
  async updateResumeEducation(id, educations) {
    return await axios.put(API.resumes_resume_education, {
      id: id,
      education: educations,
    });
  }
}

export default new ResumesAPI();
