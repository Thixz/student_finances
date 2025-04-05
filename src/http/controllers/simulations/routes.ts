import { FastifyInstance } from "fastify";
import { createSimulation, createSimulationBodySchema } from "./create";
import { z } from "zod";
import { errorSchema } from "@src/helpers/ErrorSchema";
import { getAllSimulationsByStudentId } from "./getAll";
import { deleteSimulation, deleteSimulationParamsSchema } from "./delete";
import { verifyJWT } from "@src/http/middlewares/verify-authentication";

const simulationSchema = z.object({
  id: z.string().uuid(),
  id_estudante: z.string().uuid(),
  valor_total: z.any(),
  quantidade_parcelas: z.number(),
  juros_ao_mes: z.any(),
  valor_parcela_mensal: z.any(),
});

export function simulationsRoutes(app: FastifyInstance) {
  app.post(
    "/api/simulations",
    {
      onRequest: [verifyJWT],
      schema: {
        description: "Creates a new simulation",
        tags: ["simulations"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: createSimulationBodySchema,
        response: {
          201: z
          .object({
            simulation: simulationSchema,
          }).describe("Simulation Created"),
          400: errorSchema.describe("Wrong quantities"),
        },
      },
    },
    createSimulation
  );

  app.get(
    "/api/simulations",
    {
      onRequest: [verifyJWT],
      schema: {
        description: "Retrieves all logged in student simulations",
        tags: ["simulations"],
        security: [
            {
              bearerAuth: [],
            },
          ],
        response: {
          200: z
            .object({
              simulations: z.array(simulationSchema),
            })
            .describe("List of simulations"),
        },
      },
    },
    getAllSimulationsByStudentId
  );

  app.delete(
    "/api/simulations/:id",
    {
      onRequest: [verifyJWT],
      schema: {
        description: "Deletes a simulation",
        tags: ["simulations"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: deleteSimulationParamsSchema,
        response: {
          204: z.null().describe("Simulation deleted"),
          400: errorSchema.describe("Business rules errors"),
        },
      },
    },
    deleteSimulation
  );
  
}
