import axios from "axios";

const API = {
  university: "https://universities-and-colleges.p.rapidapi.com/universities",
  skill: "https://api.apilayer.com/skills",
};

class PublicAPI {
  async getSkills(search = "") {
    try {
      return await axios.get(API.skill, {
        timeout: 3000,
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_LAYER_KEY,
        },
        params: {
          q: search,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
  async getUniversity(search = "") {
    return await axios.get(API.university, {
      headers: {
        "x-rapidapi-key": "a190f04b6bmsh8830aa2dc3548e9p1fe93cjsnaba76a20ea88",
        "x-rapidapi-host": "universities-and-colleges.p.rapidapi.com",
      },
      params: {
        search: search,
        page: 0,
      },
    });
  }
}

export default new PublicAPI();
