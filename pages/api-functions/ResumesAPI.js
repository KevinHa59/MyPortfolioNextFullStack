import axios from "axios";
axios.defaults.withCredentials = true;
const API = {
  resumes: "/api/resumes",
  resumes_resume: "/api/resumes/resume",
  resumes_resume_education: "/api/resumes/resume/education",
  resumes_resume_certification: "/api/resumes/resume/certification",
  resumes_resume_skill: "/api/resumes/resume/skill",
  resumes_resume_work: "/api/resumes/resume/work",
  resumes_resume_volunteer: "/api/resumes/resume/volunteer",
  resumes_resume_award: "/api/resumes/resume/award",
  resumes_resume_language: "/api/resumes/resume/language",
  resumes_resume_hobby: "/api/resumes/resume/hobby",
};

class ResumesAPI {
  async getResumes() {
    return await axios.get(API.resumes, {
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
    });
  }
  async createResume(userID, title) {
    return await axios.post(API.resumes, {
      userID,
      title,
    });
  }
  async getResumeByID(id) {
    return await axios.get(API.resumes_resume, {
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
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
  async deleteResumeSkill(id) {
    return await axios.delete(API.resumes_resume_skill, {
      params: {
        id: id,
      },
    });
  }
  async updateResumeProject(id, projects) {
    return await axios.put(API.resumes_resume_project, {
      id: id,
      projects: projects,
    });
  }
  async deleteResumeProject(id) {
    return await axios.delete(API.resumes_resume_project, {
      params: {
        id: id,
      },
    });
  }
  async updateResumeWork(id, works) {
    return await axios.put(API.resumes_resume_work, {
      id: id,
      works: works,
    });
  }
  async deleteResumeWork(id) {
    return await axios.delete(API.resumes_resume_work, {
      params: {
        id: id,
      },
    });
  }
  async updateResumeVolunteer(id, volunteers) {
    return await axios.put(API.resumes_resume_volunteer, {
      id: id,
      volunteers: volunteers,
    });
  }
  async deleteResumeVolunteer(id) {
    return await axios.delete(API.resumes_resume_volunteer, {
      params: {
        id: id,
      },
    });
  }
  async updateResumeAward(id, awards) {
    return await axios.put(API.resumes_resume_award, {
      id: id,
      awards: awards,
    });
  }
  async deleteResumeAward(id) {
    return await axios.delete(API.resumes_resume_award, {
      params: {
        id: id,
      },
    });
  }
  async updateResumeLanguage(id, languages) {
    return await axios.put(API.resumes_resume_language, {
      id: id,
      languages: languages,
    });
  }
  async deleteResumeHobby(id) {
    return await axios.delete(API.resumes_resume_award, {
      params: {
        id: id,
      },
    });
  }
  async updateResumeHobby(id, hobbies) {
    return await axios.put(API.resumes_resume_hobby, {
      id: id,
      hobbies: hobbies,
    });
  }
  async deleteResumeLanguage(id) {
    return await axios.delete(API.resumes_resume_hobby, {
      params: {
        id: id,
      },
    });
  }
}

export default new ResumesAPI();
