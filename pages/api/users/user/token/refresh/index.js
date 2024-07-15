import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../../../../../utils/hash";
import { parse, serialize } from "cookie";
import jwt from "jsonwebtoken";
import JwtUtils from "../../../../../../utils/jwtUtil";
import { getCookie } from "cookies-next";
const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/users
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "POST") {
    refreshToken(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [POST] refresh token
async function refreshToken(req, res) {
  try {
    const cookies = parse(req.headers.cookie || "");
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(
      refreshToken,
      process.env.NEXT_PUBLIC_TOKEN_KEY,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid token" });
        }
        const user = await prisma.users.findUnique({
          where: { email: decoded.email },
        });

        if (!user || user.refreshToken !== refreshToken) {
          return res.status(403).json({ message: "Invalid token" });
        }

        const newAccessToken = JwtUtils.generateAccessToken(user.email);
        user["token"] = newAccessToken;
        delete user.password;
        delete user.refreshToken;
        // store user data to cookie and access from frontend
        res.setHeader(
          "Set-Cookie",
          serialize("user", JSON.stringify(user), {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
          })
        );
        res.status(201).json({ accessToken: newAccessToken });
      }
    );
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}
