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
  } else if (method === "PUT") {
    updateUser(req, res);
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
      ? await prisma.user.count()
      : await prisma.user.findMany({
          include: {
            resumes: true,
            userType: true,
            status: true,
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
    if (!body.email || !body.firstName) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const hashedPassword = body.password
      ? await hashPassword(body.password)
      : null;
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        firstName: body.firstName,
        lastName: body.lastName || "",
        userTypeID: "6682ce65add598fe72845318",
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}
// [PUT] handle update user master
// input: anything but password
async function updateUser(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.id || body.password) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const userID = body.id;
    delete body.id;
    const user = await prisma.user.update({
      where: { id: userID },
      data: {
        ...body,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}
