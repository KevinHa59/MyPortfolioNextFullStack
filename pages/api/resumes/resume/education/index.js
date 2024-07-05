import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/resume/education
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "PUT") {
    updateResumeEducation(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [PUT] handle update resume education
// input: id, update data
async function updateResumeEducation(req, res) {
  try {
    const { id, education } = req.body;

    // input validation
    if (!id || !education) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const resume = await prisma.$transaction(
      education.map((edu) =>
        prisma.education.upsert({
          where: { id: edu.id || "" }, // Ensure edu.id is a valid unique identifier or handle missing id
          create: {
            resumeID: id,
            degree: edu.degree,
            schoolName: edu.schoolName,
            location: edu.location,
            startDate: new Date(edu.startDate),
            endDate: new Date(edu.endDate),
            fieldOfStudy: edu.fieldOfStudy,
            gpa: parseFloat(edu.gpa),
          },
          update: {
            resumeID: id,
            degree: edu.degree,
            schoolName: edu.schoolName,
            location: edu.location,
            startDate: new Date(edu.startDate),
            endDate: new Date(edu.endDate),
            fieldOfStudy: edu.fieldOfStudy,
            gpa: parseFloat(edu.gpa),
          },
        })
      )
    );
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}
