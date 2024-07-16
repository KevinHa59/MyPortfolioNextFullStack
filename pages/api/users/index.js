import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../../utils/hash";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/users
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "GET") {
    getUsers(req, res);
  } else if (method === "POST") {
    createUser(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle get users
async function getUsers(req, res) {
  try {
    const { isQuantity } = req.query;
    const isCount = ["1", "true"].includes(isQuantity.toString());
    const users = isCount
      ? await prisma.users.count()
      : await prisma.users.findMany({
          include: {
            resumes: true,
            userType: true,
          },
        });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ err: "Internal server error" });
  }
}

// [POST] handle create user
// input: email, firstName, lastName, dob, userTypeID
async function createUser(req, res) {
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
    const hashedPassword = await hashPassword(body.password);
    const user = await prisma.users.create({
      data: {
        email: body.email,
        password: hashedPassword,
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
