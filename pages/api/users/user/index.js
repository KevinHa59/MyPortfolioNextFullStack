import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/users/user
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "GET") {
    getUserByID(req, res);
  } else if (method === "DELETE") {
    removeUserByID(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle get user by id
// input: id
async function getUserByID(req, res) {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const user = await prisma.users.findUnique({ where: { id: id } });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ err: "Internal server error" });
  }
}

// [PUT] handle update user
// input: email, firstName, lastName, dob, userTypeID
async function UpdateUser(req, res) {
  try {
    const body = req.body;
    // input validation
    if (
      !body.email ||
      !body.password ||
      !body.firstName ||
      !body.lastName ||
      !body.dob ||
      !body.userTypeID
    ) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const user = await prisma.users.create({
      data: {
        email: body.email,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
        dob: new Date(body.dob),
        userTypeID: body.userTypeID,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}

// [DELETE] handle remove user
async function removeUserByID(req, res) {
  try {
    const { id } = req.query;
    // input validation
    if (!id) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const user = await prisma.users.delete({
      where: {
        id: id,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}
