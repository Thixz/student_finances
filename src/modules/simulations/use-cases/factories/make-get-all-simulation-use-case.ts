import { PrismaSimulationsRepository } from "../../repositories/prisma/prisma-simulations-repository";
import { GetAllSimulationUseCase } from "../get-all-simulation";

export function makegetAllSimulationUseCase() {
  const prismaSimulationsRepository = new PrismaSimulationsRepository();
  const getAllSimulationUseCase = new GetAllSimulationUseCase(
    prismaSimulationsRepository
  );

  return getAllSimulationUseCase;
}
