import { DefaultError } from "@src/helpers/DefaultError";
import { ISimulationsRepository } from "../repositories/Isimulations-repository";

interface DeleteSimulationUseCaseParams {
  id_estudante: string;
  id: string;
}

export class DeleteSimulationUseCase {
  constructor(private simulationsRepository: ISimulationsRepository) {}

  async execute({
    id_estudante,
    id,
  }: DeleteSimulationUseCaseParams): Promise<void> {
    const simulation = await this.simulationsRepository.getById(id);

    if (!simulation) throw new DefaultError("Simulation not found.", 400);

    if (simulation.id_estudante != id_estudante)
      throw new DefaultError(
        "Impossible to delete a simulation from another student.",
        400
      );

    await this.simulationsRepository.delete(id)
  }
}
