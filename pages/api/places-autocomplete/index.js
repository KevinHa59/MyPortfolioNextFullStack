import axios from "axios";

export default async function handler(req, res) {
  const method = req.method;
  if (method === "GET") {
    const { q, limit = 5 } = req.query;
    try {
      const { data } = await axios.get(
        "https://api.locationiq.com/v1/autocomplete",
        {
          params: {
            key: "pk.9762fe56bc75ff7141d4c91539b15332",
            q: q,
            limit: limit,
          },
        }
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).send("Error fetching data");
    }
  }
}
