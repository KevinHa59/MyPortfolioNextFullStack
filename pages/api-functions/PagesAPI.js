import axios from "axios";

axios.defaults.withCredentials = true;
const API = {
  pages: "/api/pages",
};

class PagesAPI {
  async getPages(isUserTypeIncluding = false, isQuantity = false) {
    return await axios.get(API.pages, {
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
      params: {
        isUserTypeIncluding: isUserTypeIncluding ? "1" : "0",
        isQuantity: isQuantity ? "1" : "0",
      },
    });
  }
  async createPages(pages) {
    return await axios.post(
      API.pages,
      {
        pages,
      },
      { timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT }
    );
  }
  // if id is given, perform update, otherwise, create
  async savePage(path, description, id = null) {
    return await axios.put(
      API.pages,
      {
        path,
        description,
        id,
      },
      { timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT }
    );
  }
  async deletePage(id) {
    return await axios.delete(API.pages, {
      timeout: process.env.NEXT_PUBLIC_AXIOS_TIMEOUT,
      params: {
        id: id,
      },
    });
  }
}

export default new PagesAPI();
