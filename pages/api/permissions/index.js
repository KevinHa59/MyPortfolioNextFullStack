import { PrismaClient } from "@prisma/client";

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
    createPermissions(req, res);
  } else if (method === "DELETE") {
    removePermissions(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [POST] handle insert permission
// input: array of objects with key path and description
async function createPermissions(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.links) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const links = await prisma.userTypePageLinks.createMany({
      data: body.links,
    });
    res.status(201).json(links);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}

// [DELETE] handle remove page
async function removePermissions(req, res) {
  try {
    const { ids } = req.query;
    // input validation
    if (!ids) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const _ids = ids.split(",");
    const links = await prisma.pages.deleteMany({
      where: {
        id: {
          in: _ids,
        },
      },
    });
    res.status(201).json(links);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}
