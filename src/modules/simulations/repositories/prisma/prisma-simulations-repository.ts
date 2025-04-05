import { Prisma, Simulation } from "@prisma/client";
import { ISimulationsRepository } from "../Isimulations-repository";
import { prisma } from "@src/lib/prisma";

export class PrismaSimulationsRepository implements ISimulationsRepository {
  async create(data: Prisma.SimulationCreateInput): Promise<Simulation> {
    return await prisma.simulation.create({ data });
  }

  async getAll(): Promise<Simulation[]> {
    return await prisma.simulation.findMany();
  }
}
