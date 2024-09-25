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
  if (method === "GET") {
    getPermissions(req, res);
  } else if (method === "POST") {
    createPermissions(req, res);
  } else if (method === "DELETE") {
    removePermissions(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle insert permission
async function getPermissions(req, res) {
  try {
    const { userTypeID, pageID } = req.query;
    // // input validation
    // if (!userTypeID && !pageID) {
    //   res.status(400).json({ error: "Incomplete data" });
    // }
    let result = [];
    if (userTypeID) {
      const res = await prisma.userTypePageLinks.findMany({
        where: {
          userTypeID: userTypeID,
        },
        include: {
          page: true,
        },
      });

      result = res.map((item) => item.page);
    } else if (pageID) {
      const res = await prisma.userTypePageLinks.findMany({
        where: {
          pageID: pageID,
        },
        include: {
          userType: true,
        },
      });

      result = res.map((item) => item.userType);
    } else {
      const res = await prisma.userTypePageLinks.findMany();
      result = res;
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
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
    const result = await Promise.all(
      body.links.map((data) => prisma.userTypePageLinks.create({ data }))
    );
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
