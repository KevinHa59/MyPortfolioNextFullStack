import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../../../../utils/hash";
import { errorMapping } from "../../../../../utils/errorCodeMapping";

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
    UpdateRole(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [PUT] handle update user
// input: userIDs, userTypeID
async function UpdateRole(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.userIDs || !body.userTypeID) {
      return res.status(400).json({ error: "Incomplete data" });
    }
    // update password
    const user = await prisma.user.updateMany({
      where: {
        id: {
          in: body.userIDs,
        },
      },
      data: {
        userTypeID: body.userTypeID,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}
