import { PrismaClient } from "@prisma/client";
import axios from "axios";
import path from "path";
import fs from "fs";
const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/resume
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "GET") {
    getUniversities(req, res);
  } else if (method === "POST") {
    createResume(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle get resume
async function getUniversities(req, res) {
  try {
    const { name, limit } = req.query;
    const filePath = path.join(process.cwd(), "pages/api/generals/uni.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(jsonData);
    let unis = data.filter((u) =>
      u.name.toLowerCase().includes(name.toLowerCase())
    );
    if (limit) {
      unis = unis.slice(0, limit);
    }
    res.status(200).json(unis);
  } catch (error) {
    res.status(500).json({ err: "Internal server error" });
  }
}
