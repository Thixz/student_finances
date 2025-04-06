import { makeUpdateStudentPasswordUseCase } from "@src/modules/students/use-cases/factories/make-update-student-password-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export const updatePasswordBodySchema = z.object({
    old_password: z.string(),
    new_password: z.string().min(6),
  });

export async function updateStudentPassword(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const { old_password, new_password } = updatePasswordBodySchema.parse(request.body);

  const updateStudentPasswordUseCase = makeUpdateStudentPasswordUseCase();

  await updateStudentPasswordUseCase.execute({
    id: request.user.sub,
    old_password,
    new_password,
  });

  return reply.status(204).send();
}
