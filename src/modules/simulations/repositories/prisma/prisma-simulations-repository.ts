import { Prisma, Simulation } from "@prisma/client";
import { ISimulationsRepository } from "../Isimulations-repository";
import { prisma } from "@src/lib/prisma";

export class PrismaSimulationsRepository implements ISimulationsRepository {
  async getById(id: string): Promise<Simulation | null> {
    return await prisma.simulation.findUnique({where:{id}})
  }

  async delete(id: string): Promise<void> {
    await prisma.simulation.delete({ where: { id } });
  }

  async create(
    data: Prisma.SimulationUncheckedCreateInput
  ): Promise<Simulation> {
    return await prisma.simulation.create({ data });
  }

  async getAll(id_estudante: string): Promise<Simulation[]> {
    return await prisma.simulation.findMany({ where: { id_estudante } });
  }
}
