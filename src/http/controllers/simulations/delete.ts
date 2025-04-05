import { makeDeleteSimulationUseCase } from "@src/modules/simulations/use-cases/factories/make-delete-simulation-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const deleteSimulationParamsSchema = z.object({
  id: z.string().uuid(),
});

export async function deleteSimulation(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = deleteSimulationParamsSchema.parse(request.params);

  const deleteSimulationUseCase = makeDeleteSimulationUseCase();
  await deleteSimulationUseCase.execute({ id_estudante: request.user.sub, id });

  return reply.status(204).send();
}
