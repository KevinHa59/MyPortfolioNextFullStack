import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();
/**
 * @param {import('next').NextApiRequest} req The HTTP request object.
 * @param {import('next').NextApiResponse} res The HTTP response object.
 */

// api/resume/certification
// api handler
export default async function handler(req, res) {
  const method = req.method;
  if (method === "PUT") {
    updateResumeCertification(req, res);
  } else {
    res.status(405).json({ error: "Method not allows" });
  }
}

// [PUT] handle update resume certification
// input: id, update data
async function updateResumeCertification(req, res) {
  try {
    const { id, certifications } = req.body;

    // input validation
    if (!id || !certifications) {
      res.status(400).json({ error: "Incomplete data" });
    }

    const _certifications = certifications.map((certification) => ({
      where: { id: certification.id || new ObjectId().toString() }, // Use an empty string or a temporary value if `id` is not present for new entries
      create: {
        certificationName: certification.certificationName,
        issuingOrganization: certification.issuingOrganization,
        dateObtained: new Date(certification.dateObtained).toISOString(),
      },
      update: {
        certificationName: certification.certificationName,
        issuingOrganization: certification.issuingOrganization,
        dateObtained: new Date(certification.dateObtained).toISOString(),
      },
    }));
    const resume = await prisma.resume.update({
      where: { id: id },
      data: {
        certifications: {
          upsert: _certifications,
        },
      },
      include: {
        certifications: {
          orderBy: {
            dateObtained: "desc",
          },
        },
      },
    });
    res.status(201).json(resume.certifications);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error", error: err });
  }
}
