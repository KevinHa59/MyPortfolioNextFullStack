import { PrismaClient } from "@prisma/client";
import jwt from "../../../../../utils/jwtUtil";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/users/user
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "PUT") {
    generateToken(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [PUT] handle update user
// input: email, firstName, lastName, dob, userTypeID
async function generateToken(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.email) {
      res.status(400).json({ error: "Incomplete data" });
    }
    // verify email
    const verifyUser = await prisma.users.findUnique({
      where: { email: body.email },
    });
    // if email not valid return 401
    if (!verifyUser) {
      return res.status(401).join({ err: "Invalid User" });
    }
    // hash given email
    const refreshToken = jwt.generateRefreshToken(body.email);
    // update password
    const user = await prisma.users.update({
      where: { email: body.email },
      data: {
        refreshToken: refreshToken,
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
