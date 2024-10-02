import { PrismaClient } from "@prisma/client";
import { errorMapping } from "../../../../utils/errorCodeMapping";
import { status } from "../../status/status";

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
    getUserByEmail(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle get user by email
// input: id
async function getUserByEmail(req, res) {
  try {
    const { email } = req.query;
    if (!email) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        userType: {
          include: {
            pageLinks: {
              include: {
                page: true,
              },
            },
          },
        },
        credential: true,
      },
    });
    // get user access paths
    user.userType.pageLinks = user.userType.pageLinks.map((link) => link.page);

    let activeMembership = null;

    if (user) {
      activeMembership = await prisma.membership.findFirst({
        where: {
          userID: user.id, // Use the user's ID to find their membership
          statusID: status.Active,
        },
        include: {
          status: true,
          membershipType: {
            include: {
              feature: {
                include: {
                  membershipResumeSection: true,
                },
              },
            },
          },
        },
      });
    }

    if (user) {
      user.membership = activeMembership || null; // Set membership key in the user object
    }
    if (user !== null) {
      user["hasPassword"] = user.password !== null && user.password.length > 0;
      delete user.password;
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}
