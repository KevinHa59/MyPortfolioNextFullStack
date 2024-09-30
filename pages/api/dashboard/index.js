import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";
import { errorMapping } from "../../../utils/errorCodeMapping";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/status
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "GET") {
    getDashboard(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle get status
async function getDashboard(req, res) {
  try {
    // Create an array of promises for all Prisma queries
    const [users, userTypes, resumes, courses, membershipTypes] =
      await Promise.all([
        prisma.user.count(), // Count users
        prisma.userType.findMany({
          include: {
            _count: {
              select: {
                users: true, // Include count of users
              },
            },
          },
        }), // Get user types with user counts
        prisma.resume.count(), // Count resumes
        prisma.course.count(), // Count courses
        prisma.membershipType.findMany({
          include: {
            _count: {
              select: {
                memberships: {
                  where: {
                    status: {
                      name: "Active", // Count active memberships
                    },
                  },
                },
              },
            },
          },
        }), // Get membership types with active membership counts
      ]);

    // Create the dashboard object based on the responses
    const dashboard = {
      users,
      userTypes,
      resumes,
      courses,
      membershipTypes: membershipTypes.map((type) => ({
        ...type,
        membershipCount: type._count.memberships, // Rename _count to membershipCount
      })),
    };

    res.status(200).json(dashboard);
  } catch (err) {
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}
