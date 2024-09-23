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
  if (method === "POST") {
    createCredential(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [POST] handle insert credential
// input: array of objects with key path and description
async function createCredential(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.userID) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const user = await prisma.user.update({
      where: {
        id: body.userID,
      },
      data: {
        credential: {
          create: {
            apiKey: `ez_folio_${new UUID()}`,
            allowedOrigins: [],
            createdAt: new Date(),
          },
        },
      },
      include: {
        credential: true,
      },
    });
    const newCredential = user.credential;
    res.status(201).json(newCredential);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
}
