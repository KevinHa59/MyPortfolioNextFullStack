import axios from "axios";

const API = {
  university: "https://universities-and-colleges.p.rapidapi.com/universities",
};

class PublicAPI {
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
