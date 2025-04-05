import { FastifyInstance } from "fastify";
import { z } from "zod";
import { registerStudent, registerStudentBodySchema } from "./create";
import { updateStudent, updateStudentBodySchema } from "./update";
import { authenticate, authenticateStudentBodySchema } from "./authenticate";
import { verifyJWT } from "@src/http/middlewares/verify-authentication";
import { getStudentProfile } from "./getProfile";
import { refreshToken } from "./refreshToken";
import { errorSchema } from "@src/helpers/ErrorSchema";

const studentSchema = z.object({
  student: z.object({
    id: z.string(),
    nome: z.string(),
    sobrenome: z.string(),
    email: z.string(),
  }),
});

export function studentsRoutes(app: FastifyInstance) {
  app.post(
    "/api/register",
    {
      schema: {
        description: "Creates a new student",
        tags: ["students"],
        body: registerStudentBodySchema,
        response: {
          201: z.null().describe("Student Created"),
          409: z.string().describe("Duplicated email"),
        },
      },
    },
    registerStudent
  );

  app.post(
    "/api/login",
    {
      schema: {
        description: "Authenticates a student",
        tags: ["students"],
        body: authenticateStudentBodySchema,
        response: {
          200: z
            .object({ token: z.string() })
            .describe("Student authenticated"),
          400: errorSchema.describe("Invalid credentials"),
        },
      },
    },
    authenticate
  );

  app.post(
    "/api/refreshToken",
    {
      schema: {
        description: "Refreshs a token",
        tags: ["students"],
        response: {
          200: z
            .object({ token: z.string() })
            .describe("Token refreshed"),
          400: errorSchema.describe("Invalid credentials"),
        },
      },
    },
    refreshToken
  );

  app.post(
    "/api/me",
    {
      onRequest: [verifyJWT],
      schema: {
        description: "Retrieves an authenticated student data",
        tags: ["students"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        response: {
          200: studentSchema,
          401: errorSchema.describe("Unauthorized"),
        },
      },
    },
    getStudentProfile
  );

  app.put(
    "/api/me",
    {
      onRequest: [verifyJWT],
      schema: {
        description: "Updates a student",
        tags: ["students"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: updateStudentBodySchema,
        response: {
          204: z.null().describe("Student Updated"),
          401: errorSchema.describe("Unauthorized"),
        },
      },
    },
    updateStudent
  );
}
