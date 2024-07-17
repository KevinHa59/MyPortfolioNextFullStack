import { PrismaClient } from "@prisma/client";
import { errorMapping } from "../../../../utils/errorCodeMapping";

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
  } else if (method === "PUT") {
    UpdateUser(req, res);
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
  } catch (err) {
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}

// [PUT] handle update user
// input: email, firstName, lastName, dob, userTypeID, ...
async function UpdateUser(req, res) {
  try {
    const { id, dob, userTypeID, ...rest } = req.body;

    // Validate required fields
    if (!id) {
      return res.status(400).json({ error: "Incomplete data" });
    }
    // Prepare data object with optional fields
    const dataToUpdate = {
      ...rest,
      dob: dob ? new Date(dob) : null,
    };
    delete dataToUpdate.id;
    const user = await prisma.users.update({
      where: { id: id },
      data: dataToUpdate,
    });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
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
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}
