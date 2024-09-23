import { PrismaClient } from "@prisma/client";
import { hashPassword, verifyPassword } from "../../../../../utils/hash";
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
    UpdatePassword(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [PUT] handle update user
// input: email, firstName, lastName, dob, userTypeID
async function UpdatePassword(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.email || !body.password) {
      return res.status(400).json({ error: "Incomplete data" });
    }
    // verify email
    const verifyUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    // if email not valid return 401
    if (verifyUser === null) {
      return res.status(401).json({ err: "Invalid User" });
    }
    let isValid = true;
    // if user has password
    if (verifyUser.password !== null && verifyUser.password.length > 0) {
      // if not given current password return error
      if (!body.currentPassword) {
        return res.status(400).json({ error: "Incomplete data" });
      }
      //verify given current password to given email user password
      else {
        isValid = await verifyPassword(
          body.currentPassword,
          verifyUser.password
        );
        console.log(isValid, body.currentPassword, verifyUser.password);
      }
    }
    if (isValid) {
      // hash given password
      const hashedPassword = await hashPassword(body.password);
      // update password
      const user = await prisma.user.update({
        where: { email: body.email },
        data: {
          password: hashedPassword,
        },
      });
      return res.status(201).json(user);
    } else {
      return res.status(401).json({ err: "Current password is incorrect" });
    }
  } catch (err) {
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}
