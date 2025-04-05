import { Simulation,Prisma } from "@prisma/client";

export interface ISimulationsRepository {
  create(data: Prisma.SimulationUncheckedCreateInput): Promise<Simulation>;
  getAll(id_estudante:string): Promise<Simulation[]>;
  delete(id:string): Promise<void>;
  getById(id:string): Promise<Simulation | null>;
}
