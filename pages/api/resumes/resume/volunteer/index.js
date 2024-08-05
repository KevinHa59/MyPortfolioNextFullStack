import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/resume/volunteer
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "PUT") {
    updateResumeVolunteer(req, res);
  } else if (method === "DELETE") {
    removeResumeVolunteer(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [PUT] handle update resume volunteer
// input: id, update data
async function updateResumeVolunteer(req, res) {
  try {
    const { id, volunteers } = req.body;

    // input validation
    if (!id || !volunteers) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const _volunteer = volunteers.map((volunteer) => ({
      where: { id: volunteer.id || new ObjectId().toString() }, // Use an empty string or a temporary value if `id` is not present for new entries
      create: {
        role: volunteer.role,
        organizationName: volunteer.organizationName,
        location: volunteer.location,
        startDate: new Date(volunteer.startDate).toISOString(),
        endDate: volunteer.endDate
          ? new Date(volunteer.endDate).toISOString()
          : null,
        responsibilities: volunteer.responsibilities,
      },
      update: {
        role: volunteer.role,
        organizationName: volunteer.organizationName,
        location: volunteer.location,
        startDate: new Date(volunteer.startDate).toISOString(),
        endDate: volunteer.endDate
          ? new Date(volunteer.endDate).toISOString()
          : null,
        responsibilities: volunteer.responsibilities,
      },
    }));

    const resume = await prisma.resume.update({
      where: { id: id },
      data: {
        volunteerExperience: {
          upsert: _volunteer,
        },
      },
      include: {
        volunteerExperience: {
          orderBy: {
            startDate: "desc",
          },
        },
      },
    });
    res.status(201).json(resume.volunteerExperience);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}

// [DELETE] handle delete resume volunteer
// input: id
async function removeResumeVolunteer(req, res) {
  try {
    const { id } = req.query;

    // input validation
    if (!id) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const resume = await prisma.volunteerExperience.delete({
      where: { id: id },
    });
    res.status(201).json(resume);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}
