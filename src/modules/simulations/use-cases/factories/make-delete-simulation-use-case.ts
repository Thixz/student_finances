import { PrismaSimulationsRepository } from "../../repositories/prisma/prisma-simulations-repository";
import { DeleteSimulationUseCase } from "../delete-simulation";

export function makeDeleteSimulationUseCase() {
  const prismaSimulationsRepository = new PrismaSimulationsRepository();
  const deleteSimulationUseCase = new DeleteSimulationUseCase(
    prismaSimulationsRepository
  );

  return deleteSimulationUseCase;
}
