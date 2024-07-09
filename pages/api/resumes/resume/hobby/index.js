import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/resume/hobby
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "PUT") {
    updateResumeHobby(req, res);
  } else if (method === "PUT") {
    removeResumeHobby(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [PUT] handle update resume hobby
// input: id, update data
async function updateResumeHobby(req, res) {
  try {
    const { id, hobbies } = req.body;

    // input validation
    if (!id || !hobbies) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const _hobbies = hobbies.map((hobby) => ({
      where: { id: hobby.id || new ObjectId().toString() }, // Use an empty string or a temporary value if `id` is not present for new entries
      create: {
        name: hobby.name || null,
      },
      update: {
        name: hobby.name || null,
      },
    }));
    const resume = await prisma.resume.update({
      where: { id: id },
      data: {
        hobbies: {
          upsert: _hobbies,
        },
      },
    });
    res.status(201).json(resume);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}

// [DELETE] handle delete resume hobby
// input: id
async function removeResumeHobby(req, res) {
  try {
    const { id } = req.query;

    // input validation
    if (!id) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const resume = await prisma.hobby.delete({
      where: { id: id },
    });
    res.status(201).json(resume);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}
