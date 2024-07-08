import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/resume/project
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "PUT") {
    updateResumeProject(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [PUT] handle update resume project
// input: id, update data
async function updateResumeProject(req, res) {
  try {
    const { id, projects } = req.body;

    // input validation
    if (!id || !projects) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const _projects = projects.map((project) => ({
      where: { id: project.id || new ObjectId().toString() }, // Use an empty string or a temporary value if `id` is not present for new entries
      create: {
        title: project.title,
        role: project.role,
        description: project.description,
        technologies: project.technologies
          .split(",")
          .map((tech) => tech.trim()),
        achievements: project.achievements,
      },
      update: {
        title: project.title,
        role: project.role,
        description: project.description,
        technologies: project.technologies
          .split(",")
          .map((tech) => tech.trim()),
        achievements: project.achievements,
      },
    }));

    const resume = await prisma.resume.update({
      where: { id: id },
      data: {
        projects: {
          upsert: _projects,
        },
      },
    });
    res.status(201).json(resume);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}
