import { DefaultError } from "@src/helpers/DefaultError";
import { IStudentsRepository } from "../repositories/Istudents-repository";
import { hash } from "bcryptjs";

interface CreateStudentUseCaseParams {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
}

export class CreateStudentUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({ nome, sobrenome, email, senha }: CreateStudentUseCaseParams) {
    const senha_hash = await hash(senha, 6);

    const existingStudent = await this.studentsRepository.findByEmail(email);
    if (existingStudent) {
      throw new DefaultError(
        "It's not possible to create a student with a duplicated email address.",
        409
      );
    }

    const createdStudent = await this.studentsRepository.create({
      nome,
      sobrenome,
      email,
      senha: senha_hash,
    });

    return { createdStudent };
  }
}
