import { serializeDecimalArray } from "@src/helpers/SerializeDecimal";
import { makegetAllSimulationUseCase } from "@src/modules/simulations/use-cases/factories/make-get-all-simulation-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAllSimulationsByStudentId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getAllSimulationsUseCase = makegetAllSimulationUseCase();
  const { simulations } = await getAllSimulationsUseCase.execute({
    id_estudante: request.user.sub,
  });

  return reply.status(200).send({ simulations: serializeDecimalArray(simulations)});
}
