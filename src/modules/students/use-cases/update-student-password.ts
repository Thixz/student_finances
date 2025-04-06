import { Student } from "@prisma/client";
import { hash, compare } from "bcryptjs";
import { IStudentsRepository } from "../repositories/Istudents-repository";
import { DefaultError } from "@src/helpers/DefaultError";

interface UpdateStudentUseCaseParams {
  id: string;
  old_password: string;
  new_password: string;
}

export class UpdateStudentPasswordUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({
    id,
    old_password,
    new_password,
  }: UpdateStudentUseCaseParams): Promise<Student> {
    const student = await this.studentsRepository.findById(id);
    if (!student) {
      throw new DefaultError("Student not found.", 400);
    }

    const isOldPasswordCorrect = await compare(old_password, student.senha);

    if (!isOldPasswordCorrect) {
      throw new DefaultError("Invalid credentials.", 400);
    }

    const senha = await hash(new_password, 6);

    const updatedStudent = await this.studentsRepository.update({
      id,
      senha,
    });

    return updatedStudent;
  }
}
