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
    put(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [PUT] handle update resume sections
// input: id, update data
async function put(req, res) {
  try {
    const { resumeID, ...sections } = req.body;
    // input validation
    if (!resumeID) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const resume = await prisma.resume.update({
      where: { id: resumeID },
      data: {
        resumeSections: {
          update: {
            ...sections,
          },
        },
      },
      include: {
        resumeSections: true,
      },
    });
    res.status(201).json(resume.resumeSections);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}
