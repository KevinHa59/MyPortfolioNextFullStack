import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/resume/skill
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "PUT") {
    updateResumeSkill(req, res);
  } else if (method === "DELETE") {
    removeResumeSkill(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [PUT] handle update resume skill
// input: id, update data
async function updateResumeSkill(req, res) {
  try {
    const { id, skills } = req.body;

    // input validation
    if (!id || !skills) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const _skills = skills.map((skill) => ({
      where: { id: skill.id || new ObjectId().toString() }, // Use an empty string or a temporary value if `id` is not present for new entries
      create: {
        name: skill.name || null,
        group: skill.group,
      },
      update: {
        name: skill.name || null,
        group: skill.group,
      },
    }));
    const resume = await prisma.resume.update({
      where: { id: id },
      data: {
        skills: {
          upsert: _skills,
        },
      },
      include: {
        skills: {
          orderBy: {
            name: "asc",
          },
        },
      },
    });
    res.status(201).json(resume.skills);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}

// [DELETE] handle delete resume skill
// input: id
async function removeResumeSkill(req, res) {
  try {
    const { id } = req.query;

    // input validation
    if (!id) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const resume = await prisma.skill.delete({
      where: { id: id },
    });
    res.status(201).json(resume);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}
