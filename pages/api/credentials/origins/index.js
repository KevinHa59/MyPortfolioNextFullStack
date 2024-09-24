import { PrismaClient } from "@prisma/client";
import { UUID } from "mongodb";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/userTypes
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "PUT") {
    updateOrigins(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [PUT] handle update credential origins
// input: credential id, origins
async function updateOrigins(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.id || !body.origins) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const credential = await prisma.credential.update({
      where: {
        id: body.id,
      },
      data: {
        allowedOrigins: body.origins,
        updatedAt: new Date(),
      },
    });
    res.status(201).json(credential);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
}
