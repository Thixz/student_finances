import { Simulation } from "@prisma/client";
import { ISimulationsRepository } from "../repositories/Isimulations-repository";

interface GetAllSimulationUseCaseParams {
  id_estudante: string;
}

interface GetAllSimulationUseCaseResponse {
  simulations: Simulation[];
}

export class GetAllSimulationUseCase {
  constructor(private simulationsRepository: ISimulationsRepository) {}

  async execute({
    id_estudante,
  }: GetAllSimulationUseCaseParams): Promise<GetAllSimulationUseCaseResponse> {
    const simulations = await this.simulationsRepository.getAll(id_estudante);

    return { simulations };
  }
}
