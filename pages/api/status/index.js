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
    getStatus(req, res);
  } else if (method === "POST") {
    createStatus(req, res);
  } else if (method === "PUT") {
    updateStatus(req, res);
  } else if (method === "DELETE") {
    removeStatus(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [GET] handle get status
async function getStatus(req, res) {
  try {
    const status = await prisma.status.findMany();
    res.status(200).json(status);
  } catch (err) {
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}

// [POST] handle insert status
// input: name and/or color
async function createStatus(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.name) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const status = await prisma.status.create({
      data: {
        name: body.name,
        color: body.color ? body.color : null,
      },
    });
    res.status(201).json(status);
  } catch (err) {
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}
// [PUT] handle update status
async function updateStatus(req, res) {
  try {
    const body = req.body;
    // input validation
    if (!body.id || !body.name) {
      res.status(400).json({ error: "Incomplete data" });
    }
    const status = await prisma.status.update({
      where: { id: body.id },
      data: {
        name: body.name,
        color: body.color,
      },
    });
    res.status(201).json(status);
  } catch (err) {
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}
// [DELETE] handle remove status
async function removeStatus(req, res) {
  try {
    const { id, ids } = req.query;
    const idList = [];
    if (id) idList.push(id);
    if (ids) idList.push(...ids.split(","));
    const result = await prisma.status.deleteMany({
      where: {
        id: {
          in: idList,
        },
      },
    });
    console.log("------------", idList, ids);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    const { statusCode, message } = errorMapping[err.code];
    res.status(statusCode).json({ err: message });
  }
}
