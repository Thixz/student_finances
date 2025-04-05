import { makeUpdateStudentUseCase } from "@src/modules/students/use-cases/factories/make-update-student-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export const updateStudentBodySchema = z.object({
    nome: z.string(),
    sobrenome: z.string(),
  });

export async function updateStudent(request: FastifyRequest, reply: FastifyReply) {
  const { nome, sobrenome } = updateStudentBodySchema.parse(request.body);

  const updateStudentUseCase = makeUpdateStudentUseCase();

  await updateStudentUseCase.execute({
    id: request.user.sub,
    nome,
    sobrenome
  });

  return reply.status(204).send();
}
