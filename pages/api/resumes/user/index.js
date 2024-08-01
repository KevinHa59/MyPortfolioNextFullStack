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
    getResumesByUser(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle get resume
async function getResumesByUser(req, res) {
  try {
    const { userID, isQuantity } = req.query;
    const isCount = ["1", "true"].includes(isQuantity.toString());
    const resumes = isCount
      ? await prisma.resume.count({ where: { userID: userID } })
      : await prisma.resume.findMany({
          where: { userID: userID },
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
