import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/resume/award
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "PUT") {
    updateResumeAward(req, res);
  } else if (method === "DELETE") {
    removeResumeAward(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [PUT] handle update resume award
// input: id, update data
async function updateResumeAward(req, res) {
  try {
    const { id, awards } = req.body;

    // input validation
    if (!id || !awards) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const _awards = awards.map((award) => ({
      where: { id: award.id || new ObjectId().toString() }, // Use an empty string or a temporary value if `id` is not present for new entries
      create: {
        awardName: award.awardName,
        issuingOrganization: award.issuingOrganization,
        dateReceived: new Date(award.dateReceived).toISOString(),
      },
      update: {
        awardName: award.awardName,
        issuingOrganization: award.issuingOrganization,
        dateReceived: new Date(award.dateReceived).toISOString(),
      },
    }));
    const resume = await prisma.resume.update({
      where: { id: id },
      data: {
        awards: {
          upsert: _awards,
        },
      },
    });
    res.status(201).json(resume);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}

// [DELETE] handle delete resume award
// input: id
async function removeResumeAward(req, res) {
  try {
    const { id } = req.query;

    // input validation
    if (!id) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const resume = await prisma.award.delete({
      where: { id: id },
    });
    res.status(201).json(resume);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}
