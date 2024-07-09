import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/resume/work
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "PUT") {
    updateResumeWork(req, res);
  } else if (method === "DELETE") {
    removeResumeWork(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [PUT] handle update resume work
// input: id, update data
async function updateResumeWork(req, res) {
  try {
    const { id, works } = req.body;

    // input validation
    if (!id || !works) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const _works = works.map((work) => ({
      where: { id: work.id || new ObjectId().toString() }, // Use an empty string or a temporary value if `id` is not present for new entries
      create: {
        jobTitle: work.jobTitle,
        companyName: work.companyName,
        location: work.location,
        startDate: new Date(work.startDate).toISOString(),
        endDate: new Date(work.endDate).toISOString() || null,
        responsibilities: work.responsibilities
          .split(".")
          .map((res) => res.trim()),
      },
      update: {
        jobTitle: work.jobTitle,
        companyName: work.companyName,
        location: work.location,
        startDate: new Date(work.startDate).toISOString(),
        endDate: new Date(work.endDate).toISOString() || null,
        responsibilities: work.responsibilities
          .split(".")
          .map((res) => res.trim()),
      },
    }));

    const resume = await prisma.resume.update({
      where: { id: id },
      data: {
        workExperience: {
          upsert: _works,
        },
      },
    });
    res.status(201).json(resume);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}

// [DELETE] handle delete resume product
// input: id
async function removeResumeWork(req, res) {
  try {
    const { id } = req.query;

    // input validation
    if (!id) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const resume = await prisma.workExperience.delete({
      where: { id: id },
    });
    res.status(201).json(resume);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}
