import { describe, it, expect, beforeEach } from "vitest";
import { DeleteSimulationUseCase } from "./delete-simulation";
import { InMemorySimulationsRepository } from "../repositories/in-memory/in-memory-simulations-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { DefaultError } from "@src/helpers/DefaultError";

let simulationsRepository: InMemorySimulationsRepository;
let sut: DeleteSimulationUseCase;

describe("Delete Simulation Use Case", () => {
  beforeEach(() => {
    simulationsRepository = new InMemorySimulationsRepository();
    sut = new DeleteSimulationUseCase(simulationsRepository);
  });

  it("should be able to delete a simulation", async () => {
    const simulation = await simulationsRepository.create({
      id_estudante: "student-01",
      valor_total: new Decimal(10000),
      quantidade_parcelas: 12,
      juros_ao_mes: new Decimal(0.02),
      valor_parcela_mensal: new Decimal(1000),
    });

    await sut.execute({
      id_estudante: "student-01",
      id: simulation.id,
    });

    const found = await simulationsRepository.getById(simulation.id);
    expect(found).toBeNull();
  });

  it("should not delete a simulation that does not exist", async () => {
    await expect(() =>
      sut.execute({
        id_estudante: "student-01",
        id: "non-existent-id",
      })
    ).rejects.toBeInstanceOf(DefaultError);
  });

  it("should not delete a simulation that belongs to another student", async () => {
    const simulation = await simulationsRepository.create({
      id_estudante: "student-01",
      valor_total: new Decimal(10000),
      quantidade_parcelas: 12,
      juros_ao_mes: new Decimal(0.02),
      valor_parcela_mensal: new Decimal(1000),
    });

    await expect(() =>
      sut.execute({
        id_estudante: "student-02",
        id: simulation.id,
      })
    ).rejects.toBeInstanceOf(DefaultError);
  });
});
