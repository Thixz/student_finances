import { expect, describe, it, beforeEach } from "vitest";
import { CreateSimulationUseCase } from "./create-simulation";
import { InMemorySimulationsRepository } from "../repositories/in-memory/in-memory-simulations-repository";
import { DefaultError } from "@src/helpers/DefaultError";
import { Decimal } from "@prisma/client/runtime/library";

let simulationsRepository: InMemorySimulationsRepository;
let sut: CreateSimulationUseCase;

describe("Create Simulation Use Case", () => {
  beforeEach(() => {
    simulationsRepository = new InMemorySimulationsRepository();
    sut = new CreateSimulationUseCase(simulationsRepository);
  });

  it("should be able to create a new simulation", async () => {
    const { simulation } = await sut.execute({
      id_estudante: "student-01",
      valor_total: 10000,
      quantidade_parcelas: 12,
      juros_ao_mes: 0.02,
    });

    expect(simulation.id).toEqual(expect.any(String));
    expect(simulation.valor_parcela_mensal).toBeInstanceOf(Decimal);
  });

  it("should throw if quantidade_parcelas is 0", async () => {
    await expect(() =>
      sut.execute({
        id_estudante: "student-01",
        valor_total: 10000,
        quantidade_parcelas: 0,
        juros_ao_mes: 0.02,
      })
    ).rejects.toBeInstanceOf(DefaultError);
  });

  it("should throw if juros_ao_mes is 0", async () => {
    await expect(() =>
      sut.execute({
        id_estudante: "student-01",
        valor_total: 10000,
        quantidade_parcelas: 12,
        juros_ao_mes: 0,
      })
    ).rejects.toBeInstanceOf(DefaultError);
  });

  it("should correctly calculate the mensal installment (PMT)", async () => {
    const { simulation } = await sut.execute({
      id_estudante: "student-01",
      valor_total: 10000,
      quantidade_parcelas: 12,
      juros_ao_mes: 0.02,
    });

    const PV = new Decimal(10000);
    const i = new Decimal(0.02);
    const n = 12;
    const fator = i.div(Decimal.sub(1, Decimal.add(1, i).pow(-n)));
    const PMT = PV.mul(fator).toDecimalPlaces(2);

    expect(simulation.valor_parcela_mensal.toString()).toBe(PMT.toString());
  });
});
