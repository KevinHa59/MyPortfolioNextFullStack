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
    getUserTypes(req, res);
  } else if (method === "POST") {
    createUserType(req, res);
  } else if (method === "PUT") {
    updateUserType(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle get user types
// input: userIncluding: "1" or "true" to include users in response, otherwise users wont be including in response
async function getUserTypes(req, res) {
  const { userIncluding } = req.query;
  let isUserIncluding = false;
  if (
    userIncluding &&
    (parseInt(userIncluding) === 1 || userIncluding?.toLowerCase() === "true")
  ) {
    isUserIncluding = true;
  }
  const userTypes = await prisma.userTypes.findMany({
    include: {
      users: isUserIncluding,
    },
  });
  res.status(200).json(userTypes);
}

// [POST] handle create user type
// input: type, description
async function createUserType(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.type || !body.description) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const userType = await prisma.userTypes.create({
      data: {
        type: body.type,
        description: body.description,
      },
    });
    res.status(201).json(userType);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}

// [PUT] handle create user type
// input: type, description
async function updateUserType(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.id || !body.type || !body.description) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const userType = await prisma.userTypes.update({
      where: { id: body.id },
      data: {
        type: body.type,
        description: body.description,
        color: body.color,
      },
    });
    res.status(201).json(userType);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}
