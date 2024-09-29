import { PrismaClient } from "@prisma/client";
import { status } from "../status/status";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/memberships
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "GET") {
    getMemberships(req, res);
  } else if (method === "POST") {
    createMembership(req, res);
  } else if (method === "DELETE") {
    removeMembership(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle insert membership
async function getMemberships(req, res) {
  try {
    const result = await prisma.membership.findMany();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}

// [POST] handle insert membership
async function createMembership(req, res) {
  try {
    const body = req.body;
    const { userID } = body;
    // input validation
    if ([userID].includes(undefined)) {
      res.status(400).json({ error: "Incomplete data" });
    }
    // Set up new membership dates
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setMonth(currentDate.getMonth() + 1);
    if (endDate.getDate() !== currentDate.getDate()) {
      endDate.setDate(0); // Set to last day of next month
    }

    const newMembership = await prisma.membership.create({
      data: {
        startDate: currentDate,
        endDate: endDate,
        paid: body.paid || 0.0,
        membershipTypeID: body.membershipTypeID || "66f59507681a7e4424696958",
        statusID: status.Active,
        userID: userID,
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
    res.status(201).json(newMembership);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
}

// [DELETE] handle remove membership
async function removeMembership(req, res) {
  try {
    const { id } = req.query;
    // input validation
    if (!id) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const links = await prisma.membership.delete({
      where: {
        id: id,
      },
    });
    res.status(201).json(links);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}
