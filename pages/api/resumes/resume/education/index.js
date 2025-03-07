import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

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
  } else if (method === "DELETE") {
    removeResumeEducation(req, res);
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

    const _educations = education.map((education) => ({
      where: { id: education.id || new ObjectId().toString() }, // Use an empty string or a temporary value if `id` is not present for new entries
      create: {
        degree: education.degree,
        schoolName: education.schoolName,
        location: education.location,
        startDate: new Date(education.startDate).toISOString(),
        endDate: education.endDate
          ? new Date(education.endDate).toISOString()
          : null,
        fieldOfStudy: education.fieldOfStudy,
        gpa: education.gpa ? parseFloat(education.gpa) : null,
        relevantCourseworks: education.relevantCourseworks,
      },
      update: {
        degree: education.degree,
        schoolName: education.schoolName,
        location: education.location,
        startDate: new Date(education.startDate).toISOString(),
        endDate: education.endDate
          ? new Date(education.endDate).toISOString()
          : null,
        fieldOfStudy: education.fieldOfStudy,
        gpa: education.gpa ? parseFloat(education.gpa) : null,
        relevantCourseworks: education.relevantCourseworks,
      },
    }));

    const resume = await prisma.resume.update({
      where: { id: id },
      data: {
        education: {
          upsert: _educations,
        },
      },
      include: {
        education: {
          orderBy: {
            startDate: "desc",
          },
        },
      },
    });
    res.status(201).json(resume.education);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}

// [DELETE] handle delete resume hobby
// input: id
async function removeResumeEducation(req, res) {
  try {
    const { id } = req.query;

    // input validation
    if (!id) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const resume = await prisma.education.delete({
      where: { id: id },
    });
    res.status(201).json(resume);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}
