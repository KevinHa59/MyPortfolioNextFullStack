import axios from "axios";

const API = {
  resumes: "/api/resumes",
  resumes_resume: "/api/resumes/resume",
  resumes_resume_education: "/api/resumes/resume/education",
  resumes_resume_certification: "/api/resumes/resume/certification",
  resumes_resume_skill: "/api/resumes/resume/skill",
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

  async updateResumeEducation(id, educations) {
    return await axios.put(API.resumes_resume_education, {
      id: id,
      education: educations,
    });
  }
  async updateResumeCertification(id, certifications) {
    return await axios.put(API.resumes_resume_certification, {
      id: id,
      certifications: certifications,
    });
  }
  async updateResumeSkill(id, skills) {
    return await axios.put(API.resumes_resume_skill, {
      id: id,
      skills: skills,
    });
  }
}

export default new ResumesAPI();
