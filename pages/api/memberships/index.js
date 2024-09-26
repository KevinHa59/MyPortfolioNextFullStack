import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/memberships
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "GET") {
    getMemberships(req, res);
  } else if (method === "POST") {
    createMembership(req, res);
  } else if (method === "DELETE") {
    removePermissions(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle insert permission
async function getMemberships(req, res) {
  try {
    const result = await prisma.membership.findMany();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}

// [POST] handle insert permission
// input: array of objects with key path and description
async function createMembership(req, res) {
  try {
    const body = req.body;
    const { portfolioQuantity, resumeSection, isResumeAccess, isAPIAccess } =
      body;
    // input validation
    if (
      [portfolioQuantity, resumeSection, isResumeAccess, isAPIAccess].includes(
        undefined
      )
    ) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const result = await prisma.membership.create({});
    res.status(201).json(result);
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
    const links = await prisma.userTypePageLinks.deleteMany({
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
