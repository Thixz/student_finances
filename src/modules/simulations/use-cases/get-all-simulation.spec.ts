import { describe, it, expect, beforeEach } from "vitest";
import { GetAllSimulationUseCase } from "./get-all-simulation";
import { InMemorySimulationsRepository } from "../repositories/in-memory/in-memory-simulations-repository";
import { Decimal } from "@prisma/client/runtime/library";

let simulationsRepository: InMemorySimulationsRepository;
let sut: GetAllSimulationUseCase;

describe("Get All Simulations Use Case", () => {
  beforeEach(() => {
    simulationsRepository = new InMemorySimulationsRepository();
    sut = new GetAllSimulationUseCase(simulationsRepository);
  });

  it("should return all simulations for a given student", async () => {
    await simulationsRepository.create({
      id_estudante: "student-01",
      valor_total: new Decimal(5000),
      quantidade_parcelas: 10,
      juros_ao_mes: new Decimal(0.03),
      valor_parcela_mensal: new Decimal(600),
    });

    await simulationsRepository.create({
      id_estudante: "student-01",
      valor_total: new Decimal(7000),
      quantidade_parcelas: 12,
      juros_ao_mes: new Decimal(0.02),
      valor_parcela_mensal: new Decimal(650),
    });

    const { simulations } = await sut.execute({
      id_estudante: "student-01",
    });

    expect(simulations).toHaveLength(2);
    expect(simulations[0].id_estudante).toBe("student-01");
  });

  it("should return an empty array if the student has no simulations", async () => {
    const { simulations } = await sut.execute({
      id_estudante: "student-99",
    });

    expect(simulations).toEqual([]);
  });
});
