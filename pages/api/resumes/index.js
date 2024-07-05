import { PrismaClient } from "@prisma/client";

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
    getResumes(req, res);
  } else if (method === "POST") {
    createResume(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle get resume
async function getResumes(req, res) {
  try {
    const resumes = await prisma.resume.findMany({
      include: {
        workExperience: true,
        education: true,
        skills: true,
        certifications: true,
        projects: true,
        awards: true,
        volunteerExperience: true,
        languages: true,
        hobbies: true,
        user: true,
      },
    });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ err: "Internal server error" });
  }
}

// [POST] handle create resume
// input: email, firstName, lastName, dob, userTypeID
async function createResume(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.userID) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const resume = await prisma.resume.create({
      data: {
        userID: body.userID,
        title: body.title,
      },
    });
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}
