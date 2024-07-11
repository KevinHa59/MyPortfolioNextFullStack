// pages/api/chat.js
import axios from "axios";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

export default async function handler(req, res) {
  if (req.method === "POST") {
    const prompt = req.body.prompt;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: prompt,
          max_tokens: 100, // Adjust as needed
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data from OpenAI API" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
