import { PrismaClient } from "@prisma/client";
import { UUID } from "mongodb";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/credentials
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "POST") {
    createCredential(req, res);
  } else if (method === "PUT") {
    updateCredential(req, res);
  } else if (method === "DELETE") {
    deleteCredential(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [POST] handle insert credential
// input: userID
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
            updatedAt: new Date(),
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

// [PUT] handle update credential key
// input: credential id
async function updateCredential(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.id) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const credential = await prisma.credential.update({
      where: {
        id: body.id,
      },
      data: {
        apiKey: `ez_folio_${new UUID()}`,
        updatedAt: new Date(),
      },
    });
    res.status(201).json(credential);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
}
// [DELETE] handle delete credential
// input: credential id
async function deleteCredential(req, res) {
  try {
    const query = req.query;
    // input validation
    if (!query.id) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const user = await prisma.user.findFirst({
      where: {
        credentialID: query.id,
      },
    });
    const result = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          credentialID: null,
        },
      }),
      prisma.credential.delete({
        where: {
          id: query.id,
        },
      }),
    ]);

    res.status(201).json(result[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
}
