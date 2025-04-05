import { makeGetStudentUseCase } from "@src/modules/students/use-cases/factories/make-get-student-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getStudentProfile(request: FastifyRequest, reply: FastifyReply) {
  const getStudentProfileUseCase = makeGetStudentUseCase();

  const { student } = await getStudentProfileUseCase.execute({
    student_id: request.user.sub,
  });

  return reply.status(200).send({
    student: {
      ...student,
      senha: undefined,
    },
  });
}
