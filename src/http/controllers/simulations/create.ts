
import { serializeDecimal } from "@src/helpers/SerializeDecimal";
import { makeCreateSimulationUseCase } from "@src/modules/simulations/use-cases/factories/make-create-simulation-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const createSimulationBodySchema = z.object({
  valor_total: z.number().positive(),
  quantidade_parcelas: z.number().int().positive(),
  juros_ao_mes: z.number().positive(),
});

export async function createSimulation(request: FastifyRequest, reply: FastifyReply) {
  const { valor_total, quantidade_parcelas, juros_ao_mes } = createSimulationBodySchema.parse(request.body);

  const createSimulationUseCase = makeCreateSimulationUseCase();

  const { simulation } = await createSimulationUseCase.execute({
    id_estudante: request.user.sub,
    valor_total,
    quantidade_parcelas,
    juros_ao_mes,
  });

  return reply.status(201).send({ simulation:serializeDecimal(simulation) });
}