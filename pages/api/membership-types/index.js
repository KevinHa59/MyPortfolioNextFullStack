import { PrismaClient } from "@prisma/client";

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
    getMembershipTypes(req, res);
  } else if (method === "POST") {
    createMembershipTypes(req, res);
  } else if (method === "PUT") {
    updateMembershipTypes(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle insert membership type
async function getMembershipTypes(req, res) {
  try {
    const result = await prisma.membershipType.findMany({
      select: {
        id: true,
        type: true,
        cost: true,
        description: true,
        featureID: true,
        feature: {
          include: {
            membershipResumeSection: true,
          },
        },
        _count: {
          select: {
            memberships: true,
          },
        },
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
}

// [POST] handle insert membership type
async function createMembershipTypes(req, res) {
  try {
    const body = req.body;
    const {
      type,
      cost = 0,
      description = "",
      features = {},
      resumeSections = {},
    } = body;
    // input validation
    if (!type) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const result = await prisma.membershipType.create({
      data: {
        type: type,
        cost: cost,
        description: description,
        feature: {
          create: {
            ...features,
            membershipResumeSection: {
              create: {
                ...resumeSections,
              },
            },
          },
        },
      },
      select: {
        id: true,
        type: true,
        cost: true,
        description: true,
        featureID: true,
        feature: {
          include: {
            membershipResumeSection: true,
          },
        },
        _count: {
          select: {
            memberships: true,
          },
        },
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
}

// [PUT] handle update membership type
async function updateMembershipTypes(req, res) {
  try {
    const body = req.body;
    const {
      id,
      type,
      cost = 0,
      description = "",
      features = {},
      resumeSections = {},
    } = body;
    // input validation
    if (!type) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const result = await prisma.membershipType.update({
      where: { id: id },
      data: {
        type: type,
        cost: cost,
        description: description,
        feature: {
          update: {
            ...features,
            membershipResumeSection: {
              update: {
                ...resumeSections,
              },
            },
          },
        },
      },

      select: {
        id: true,
        type: true,
        cost: true,
        description: true,
        featureID: true,
        feature: {
          include: {
            membershipResumeSection: true,
          },
        },
        _count: {
          select: {
            memberships: true,
          },
        },
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
}
