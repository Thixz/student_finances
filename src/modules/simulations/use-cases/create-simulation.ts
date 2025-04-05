import { Decimal } from "@prisma/client/runtime/library";
import { DefaultError } from "@src/helpers/DefaultError";
import { ISimulationsRepository } from "../repositories/Isimulations-repository";

interface CreateSimulationUseCaseParams {
  id_estudante: string;
  valor_total: number;
  quantidade_parcelas: number;
  juros_ao_mes: number;
}

export class CreateSimulationUseCase {
    constructor(private simulationsRepository: ISimulationsRepository) {}
  
    async execute({
      id_estudante,
      valor_total,
      quantidade_parcelas,
      juros_ao_mes,
    }: CreateSimulationUseCaseParams) {
      if (quantidade_parcelas <= 0) {
        throw new DefaultError("Quantidade de parcelas deve ser maior que zero.", 400);
      }
  
      if (juros_ao_mes <= 0) {
        throw new DefaultError("Juros ao mês deve ser maior que zero.", 400);
      }
  
      const PV = new Decimal(valor_total);
      const i = new Decimal(juros_ao_mes);
      const n = quantidade_parcelas;
  
      // Fórmula do sistema Price: PMT = PV * (i / (1 - (1 + i)^-n))
      const fator = i.div(Decimal.sub(1, Decimal.add(1, i).pow(-n)));
      const PMT = PV.mul(fator).toDecimalPlaces(2);
  
      const simulation = await this.simulationsRepository.create({
        id_estudante,
        valor_total: PV,
        quantidade_parcelas: n,
        juros_ao_mes: i,
        valor_parcela_mensal: PMT,
      });
  
      return { simulation };
    }
  }
