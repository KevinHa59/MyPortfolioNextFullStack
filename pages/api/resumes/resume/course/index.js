import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/resume/course
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "GET") {
    getCourses(req, res);
  } else if (method === "POST") {
    createCourses(req, res);
  } else if (method === "PUT") {
    updateCourses(req, res);
  } else if (method === "DELETE") {
    deleteCourses(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}
// GET all courses or courses have name contains given given name courses
// input : {name}
async function getCourses(req, res) {
  try {
    const { name = "", rowsPerPage, pageSize, approved = true } = req.query;
    let courses = [];
    const extra = approved
      ? { approved: ["true", "1"].includes(approved.toString()) }
      : {};
    if (rowsPerPage && pageSize) {
      if (
        isNaN(rowsPerPage) ||
        isNaN(pageSize) ||
        isNaN(rowsPerPage) < 1 ||
        isNaN(pageSize) < 1
      ) {
        return res
          .status(400)
          .json({ error: "Invalid rows per page or page size" });
      }

      const from = parseInt(rowsPerPage) * (parseInt(pageSize) - 1);

      courses = await prisma.course.findMany({
        where: {
          name: {
            contains: name || "", // Ensure name is a valid string
            mode: "insensitive",
          },
          ...extra,
        },
        include: {
          user: true,
        },
        skip: from,
        take: pageSize,
      });
    } else {
      courses = await prisma.course.findMany({
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
          ...extra,
        },
        include: {
          user: true,
        },
      });
    }
    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal server error", error: error });
  }
}

async function createCourses(req, res) {
  try {
    const { course = null, courses = [], createdBy } = req.body;

    const courseList = [];
    if (course) {
      courseList.push(course);
    }
    if (courses && courses.length > 0) {
      courseList.push(...courses);
    }

    const findExisting = await prisma.course.findMany({
      where: {
        name: {
          in: courseList,
        },
      },
    });

    const newCourses = courseList.filter((_course) => {
      return !findExisting.some((item) => item.name === _course);
    });

    const result = await prisma.course.createMany({
      data: newCourses.map((name) => {
        return {
          name,
          createdBy: createdBy,
        };
      }),
    });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal server error", error: error });
  }
}
async function updateCourses(req, res) {
  try {
    const { course, courses } = req.body;

    const courseList = [];
    if (course) {
      courseList.push(course);
    }
    if (courses && courses.length > 0) {
      courseList.concat(courses);
    }
    const result = await prisma.$transaction(
      courseList.map((course) =>
        prisma.course.update({
          where: { id: course.id },
          data: { name: course.name, approved: course.approved },
        })
      )
    );

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal server error", error: error });
  }
}

async function deleteCourses(req, res) {
  try {
    const { ids } = req.query;
    const allIDs = ids.split(",");
    if (allIDs.length > 0) {
      const result = await prisma.course.deleteMany({
        where: {
          id: {
            in: allIDs,
          },
        },
      });
      res.status(201).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal server error", error: error });
  }
}
