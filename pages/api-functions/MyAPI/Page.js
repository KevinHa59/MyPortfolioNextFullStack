import PagesAPI from "../PagesAPI";

export const Page = {
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
