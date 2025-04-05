import { hash } from "bcryptjs";
import { IStudentsRepository } from "../repositories/Istudents-repository";

interface UpdateStudentUseCaseParams {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
}

export class UpdateStudentUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({ id, nome, sobrenome, senha }: UpdateStudentUseCaseParams) {
    const senha_hash = await hash(senha, 6);

    const updatedStudent = await this.studentsRepository.update({
      id,
      nome,
      sobrenome,
      senha: senha_hash,
    });

    return { updatedStudent };
  }
}
