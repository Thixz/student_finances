import { Simulation,Prisma } from "@prisma/client";

export interface ISimulationsRepository {
  create(data: Prisma.SimulationCreateInput): Promise<Simulation>;
  getAll(): Promise<Simulation[]>;
}
