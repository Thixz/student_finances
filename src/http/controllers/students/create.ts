import { makeCreateStudentUseCase } from "@src/modules/students/use-cases/factories/make-create-student-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z, ZodError } from "zod";

export const registerStudentBodySchema = z.object({
  nome: z.string(),
  sobrenome: z.string(),
  email: z.string().email(),
  senha: z.string().min(6),
});


export async function registerStudent(request: FastifyRequest, reply: FastifyReply) {
  const result = registerStudentBodySchema.safeParse(request.body);

  console.log(result)

  if (!result.success) {
    // Lança diretamente o erro, agora sim é uma ZodError
    throw new ZodError(result.error.issues);
  }

  const { nome, sobrenome, email, senha } = result.data;

  const createStudentUseCase = makeCreateStudentUseCase();
  await createStudentUseCase.execute({ nome, sobrenome, email, senha });

  return reply.status(201).send();
}
