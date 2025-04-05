import { makeCreateStudentUseCase } from "@src/modules/students/use-cases/factories/make-create-student-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function registerStudent(request: FastifyRequest, reply: FastifyReply) {
  const registerStudentBodySchema = z.object({
    nome: z.string(),
    sobrenome: z.string(),
    email: z.string().email(),
    senha: z.string().min(6),
  });

  const { nome, sobrenome, email, senha } = registerStudentBodySchema.parse(request.body);

  const createStudentUseCase = makeCreateStudentUseCase();

  await createStudentUseCase.execute({ nome, sobrenome, email, senha });

  return reply.status(201).send();
}
