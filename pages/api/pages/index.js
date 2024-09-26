import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";
import { errorMapping } from "../../../utils/errorCodeMapping";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/pages
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "GET") {
    getPages(req, res);
  } else if (method === "POST") {
    createPages(req, res);
  } else if (method === "PUT") {
    savePage(req, res);
  } else if (method === "DELETE") {
    removePageByID(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle get pages
// input: userTypeIncluding: "1" or "true" to include userTypes in response, otherwise userTypes wont be including in response
async function getPages(req, res) {
  try {
    const { userTypeIncluding, isQuantity } = req.query;
    let isUserTypeIncluding = false;
    if (
      userTypeIncluding &&
      (parseInt(userTypeIncluding) === 1 ||
        userTypeIncluding?.toLowerCase() === "true")
    ) {
      isUserTypeIncluding = true;
    }
    let pages = [];
    const method =
      isQuantity && ["1", "true"].includes(isQuantity) ? "count" : "findMany";
    if (isUserTypeIncluding) {
      pages = await prisma.pages[method]({
        include: {
          userTypeLinks: {
            include: {
              userType: true,
            },
          },
        },
      });

      pages = pages.map((page) => {
        const _page = {
          ...page,
          userTypes: page.userTypeLinks.map((link) => link.userType),
        };
        delete _page.userTypeLinks;
        return _page;
      });
    } else {
      pages = await prisma.pages[method]();
    }
    res.status(200).json(pages);
  } catch (err) {
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}

// [POST] handle insert pages
// input: array of objects with key path and description
async function createPages(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.pages) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const pages = await prisma.pages.createMany({
      data: body.pages,
    });
    res.status(201).json(pages);
  } catch (err) {
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}
// [PUT] handle insert/update page
async function savePage(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.path || !body.description) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const data = {
      path: body.path,
      description: body.description,
    };
    const page = await prisma.pages.upsert({
      where: {
        id: body.id || new ObjectId().toString(),
      },
      update: data,
      create: data,
    });
    res.status(201).json(page);
  } catch (err) {
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}

// [DELETE] handle remove page
async function removePageByID(req, res) {
  try {
    const { id } = req.query;
    // input validation
    if (!id) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const user = await prisma.pages.delete({
      where: {
        id: id,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}
