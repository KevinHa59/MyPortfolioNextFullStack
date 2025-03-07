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
    getResume(req, res);
  } else if (method === "PUT") {
    updateResume(req, res);
  } else if (method === "DELETE") {
    deleteResume(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle get resume by id
async function getResume(req, res) {
  try {
    const { id } = req.query;
    const resume = await prisma.resume.findUnique({
      where: { id: id },
      include: {
        workExperience: true,
        education: {
          orderBy: {
            startDate: "desc",
          },
        },
        skills: true,
        certifications: true,
        projects: true,
        awards: true,
        volunteerExperience: true,
        languages: true,
        hobbies: true,
        resumeSections: true,
        user: true,
      },
    });

    const sections = Object.entries(resume.resumeSections)
      .filter((item) => item[1] === false)
      .map((item) => item[0]);
    sections.forEach((hideSection) => {
      delete resume[hideSection];
    });

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ err: "Internal server error" });
  }
}

// [DELETE] handle get resume by id
async function deleteResume(req, res) {
  try {
    const { id } = req.query;
    const resumes = await prisma.resume.delete({
      where: { id: id },
    });
    res.status(201).json(resumes);
  } catch (error) {
    res.status(500).json({ err: "Internal server error" });
  }
}

// [POST] handle create resume
// input: id, update data
async function updateResume(req, res) {
  try {
    const { id, ...updateData } = req.body;

    // input validation
    if (!id || !updateData) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const resume = await prisma.resume.update({
      where: { id: id },
      data: {
        // summary: updateData.summary,
        ...updateData,
      },
    });
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}
