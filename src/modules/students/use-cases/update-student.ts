import { hash } from "bcryptjs";
import { IStudentsRepository } from "../repositories/Istudents-repository";

interface UpdateStudentUseCaseParams {
  id: string;
  nome: string;
  sobrenome: string;
}

export class UpdateStudentUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({ id, nome, sobrenome }: UpdateStudentUseCaseParams) {
    const updatedStudent = await this.studentsRepository.update({
      id,
      nome,
      sobrenome
    });

    return { updatedStudent };
  }
}
