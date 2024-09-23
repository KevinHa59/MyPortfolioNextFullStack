import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "../../../utils/hash";
import jwt from "../../../utils/jwtUtil";
import { serialize } from "cookie";
import { getCookie } from "cookies-next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/users/user
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "POST") {
    Login(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [POST] handle login
// input: email, password
async function Login(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.email || !body.password) {
      return res.status(400).json({ error: "Incomplete data" });
    }
    // find user by email
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    // if user not exist -> return error code
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // check if given password match stored password
    const isMatch = await verifyPassword(body.password, user.password);

    // if matched -> return user info with code 201, otherwise return error
    if (isMatch) {
      // generate and add access token to user data
      const accessToken = await jwt.generateAccessToken(body.email);
      user["token"] = accessToken;
      // Use the existing refresh token from the database
      const refreshToken = user.refreshToken;
      // store refresh token to cookie and access only from endpoint
      delete user.password;
      delete user.refreshToken;

      const userSession = {
        id: user.id,
        email: user.email,
        name: `${user.firstName}${user.lastName ? " " + user.lastName : ""}`,
      };

      res.status(201).json({ session: userSession });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
}
