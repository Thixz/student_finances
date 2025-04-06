import { Prisma, Simulation } from "@prisma/client";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";
import { ISimulationsRepository } from "../Isimulations-repository";

export class InMemorySimulationsRepository implements ISimulationsRepository {
  private simulations: Simulation[] = [];

  async create(
    data: Prisma.SimulationUncheckedCreateInput
  ): Promise<Simulation> {
    const simulation: Simulation = {
      id: data.id ?? randomUUID(),
      id_estudante: data.id_estudante,
      valor_total: new Decimal(data.valor_total as number | string),
      quantidade_parcelas: data.quantidade_parcelas,
      juros_ao_mes: new Decimal(data.juros_ao_mes as number | string),
      valor_parcela_mensal: new Decimal(
        data.valor_parcela_mensal as number | string
      ),
    };

    this.simulations.push(simulation);
    return simulation;
  }

  async getAll(id_estudante: string): Promise<Simulation[]> {
    return this.simulations.filter((sim) => sim.id_estudante === id_estudante);
  }

  async getById(id: string): Promise<Simulation | null> {
    const simulation = this.simulations.find((sim) => sim.id === id);
    return simulation ?? null;
  }

  async delete(id: string): Promise<void> {
    this.simulations = this.simulations.filter((sim) => sim.id !== id);
  }
}
