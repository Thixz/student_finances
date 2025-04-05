import { PrismaSimulationsRepository } from "../../repositories/prisma/prisma-simulations-repository";
import { CreateSimulationUseCase } from "../create-simulation";

export function makeCreateSimulationUseCase() {
  const prismaSimulationsRepository = new PrismaSimulationsRepository();
  const createSimulationUseCase = new CreateSimulationUseCase(
    prismaSimulationsRepository
  );

  return createSimulationUseCase;
}
