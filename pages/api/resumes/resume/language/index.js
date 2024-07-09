import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/resume/language
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "PUT") {
    updateResumeLanguage(req, res);
  } else if (method === "DELETE") {
    removeResumeLanguage(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [PUT] handle update resume language
// input: id, update data
async function updateResumeLanguage(req, res) {
  try {
    const { id, languages } = req.body;

    // input validation
    if (!id || !languages) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const _languages = languages.map((language) => ({
      where: { id: language.id || new ObjectId().toString() }, // Use an empty string or a temporary value if `id` is not present for new entries
      create: {
        language: language.language || null,
        proficiencyLevel: language.proficiencyLevel || "",
      },
      update: {
        language: language.language || null,
        proficiencyLevel: language.proficiencyLevel || "",
      },
    }));
    const resume = await prisma.resume.update({
      where: { id: id },
      data: {
        languages: {
          upsert: _languages,
        },
      },
    });
    res.status(201).json(resume);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}

// [DELETE] handle delete resume language
// input: id
async function removeResumeLanguage(req, res) {
  try {
    const { id } = req.query;

    // input validation
    if (!id) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const resume = await prisma.language.delete({
      where: { id: id },
    });
    res.status(201).json(resume);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}
