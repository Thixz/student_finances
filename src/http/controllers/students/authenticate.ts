import { makeAuthenticateStudentUseCase } from "@src/modules/students/use-cases/factories/make-authenticate-student-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const authenticateStudentBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = authenticateStudentBodySchema.parse(request.body);

  const authenticateStudentUseCase = makeAuthenticateStudentUseCase();

  const { student } = await authenticateStudentUseCase.execute({ email, password });

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: student.id
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: student.id,
        expiresIn: "7d",
      },
    }
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token });
}
