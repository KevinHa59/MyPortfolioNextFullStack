import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../../../../utils/hash";
import { errorMapping } from "../../../../../utils/errorCodeMapping";
import { status } from "../../../status/status";

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
    GetUserMembership(req, res);
  } else if (method === "POST") {
    CreateUserMembership(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}
async function GetUserMembership(req, res) {
  try {
    const query = req.query;

    if (!query.userID) {
      return res.status(400).json({ error: "Incomplete data" });
    }

    const plans = await prisma.membership.findMany({
      where: {
        userID: query.userID,
      },
      orderBy: {
        startDate: "desc",
      },
      include: {
        membershipType: true,
        status: true,
      },
    });

    return res.status(200).json(plans);
  } catch (error) {
    console.log(err);
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}

// [PUT] handle update user
// input: userIDs, userTypeID
async function CreateUserMembership(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.userID || !body.membershipTypeID) {
      return res.status(400).json({ error: "Incomplete data" });
    }

    // find current plan
    const plan = await prisma.membership.findFirst({
      where: {
        userID: body.userID,
        status: {
          name: "Active",
        },
      },
    });

    // if exist - set status to inactive and set endDate to today
    if (plan) {
      await prisma.membership.update({
        where: { id: plan.id },
        data: {
          endDate: new Date(),
          statusID: status.Inactive,
        },
      });
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
        membershipTypeID: body.membershipTypeID,
        statusID: status.Active,
        userID: body.userID,
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
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}
