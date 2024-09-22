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
    InstallationVerification(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] check if admin is available
async function InstallationVerification(req, res) {
  try {
    // find admin
    const type = await prisma.userTypes.findUnique({
      where: {
        type: "Admin", // Check for the existence of the UserType with type "User"
      },
    });
    if (type) {
      const user = await prisma.user.findMany({
        where: {
          userTypeID: type.id,
        },
        include: {
          userType: true, // Include userType details in the result if needed
        },
      });
      if (user.length === 0) {
        return res.status(200).json({ isRequired: true });
      } else {
        return res.status(200).json({ isRequired: false });
      }
    } else {
      return res.status(500).json({ err: "Internal server error" });
    }
    // if user not exist -> return error code
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}
